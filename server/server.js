// ─────────────────────────────────────────────────────────────
//  Kodbank — Banking Application Server
// ─────────────────────────────────────────────────────────────
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));

// ── Database Pool ────────────────────────────────────────────
const dbUrl = new URL(process.env.DATABASE_URL);
const pool = mysql.createPool({
    host: dbUrl.hostname,
    port: parseInt(dbUrl.port, 10),
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.replace('/', ''),
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
});

// ── Table Initialization ─────────────────────────────────────
async function initDB() {
    const conn = await pool.getConnection();
    try {
        await conn.query(`
      CREATE TABLE IF NOT EXISTS KodUser (
        uid      VARCHAR(50)   PRIMARY KEY,
        username VARCHAR(100)  UNIQUE NOT NULL,
        email    VARCHAR(100)  UNIQUE NOT NULL,
        password VARCHAR(255)  NOT NULL,
        balance  DECIMAL(15,2) DEFAULT 100000.00,
        phone    VARCHAR(20),
        role     ENUM('Customer','Manager','Admin') DEFAULT 'Customer'
      )
    `);

        await conn.query(`
      CREATE TABLE IF NOT EXISTS UserToken (
        tid    INT AUTO_INCREMENT PRIMARY KEY,
        token  TEXT NOT NULL,
        uid    VARCHAR(50),
        expiry DATETIME NOT NULL,
        FOREIGN KEY (uid) REFERENCES KodUser(uid)
      )
    `);

        console.log('✅  Tables initialized (KodUser, UserToken)');
    } finally {
        conn.release();
    }
}

// ── JWT Helpers ──────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRY = '1h';

function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: JWT_EXPIRY,
    });
}

// ── Auth Middleware ──────────────────────────────────────────
async function authenticate(req, res, next) {
    try {
        const token = req.cookies?.kodbank_token;
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });

        // Verify token exists in DB
        const [rows] = await pool.query(
            'SELECT * FROM UserToken WHERE token = ? AND expiry > NOW()',
            [token]
        );
        if (rows.length === 0) return res.status(401).json({ error: 'Token expired or revoked' });

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// ══════════════════════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════════════════════

// ── POST /api/register ───────────────────────────────────────
app.post('/api/register', async (req, res) => {
    try {
        const { uid, username, password, email, phone } = req.body;

        if (!uid || !username || !password || !email) {
            return res.status(400).json({ error: 'uid, username, password, and email are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.query(
            `INSERT INTO KodUser (uid, username, email, password, balance, phone, role)
       VALUES (?, ?, ?, ?, 100000.00, ?, 'Customer')`,
            [uid, username, email, hashedPassword, phone || null]
        );

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Username or email already exists' });
        }
        console.error('Register error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ── POST /api/login ──────────────────────────────────────────
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const [users] = await pool.query(
            'SELECT * FROM KodUser WHERE username = ?',
            [username]
        );
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Sign JWT
        const token = signToken({ sub: user.username, role: user.role });
        const decoded = jwt.decode(token);
        const expiryDate = new Date(decoded.exp * 1000);

        // Store token in DB
        await pool.query(
            'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
            [token, user.uid, expiryDate]
        );

        // Set HTTP-only cookie
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('kodbank_token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'Lax',
            maxAge: 3600000, // 1 hour
        });

        res.json({ message: 'Login successful', role: user.role });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ── GET /api/balance ─────────────────────────────────────────
app.get('/api/balance', authenticate, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT balance FROM KodUser WHERE username = ?',
            [req.user.sub]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ balance: rows[0].balance });
    } catch (err) {
        console.error('Balance error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ── Start ────────────────────────────────────────────────────
initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀  Kodbank server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌  Failed to initialize database:', err);
        process.exit(1);
    });
