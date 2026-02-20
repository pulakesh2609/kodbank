import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        uid: '',
        username: '',
        email: '',
        password: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/api/register', form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <div className="glass w-full max-w-md p-8 sm:p-10">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">
                        Kodbank
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Create your account
                    </p>
                </div>

                <div className="divider" />

                {/* Error */}
                {error && (
                    <div
                        className="mb-4 rounded-lg px-4 py-3 text-sm"
                        style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: '#cccccc',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="uid"
                        className="input-glow"
                        placeholder="User ID (e.g. USR001)"
                        value={form.uid}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="username"
                        className="input-glow"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        className="input-glow"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        className="input-glow"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="phone"
                        className="input-glow"
                        placeholder="Phone (optional)"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn-primary mt-2" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="link-mono">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
