import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import api from '../api';

/* ── Confetti — Palette colors ────────────────────────── */
function fireConfetti() {
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#355872', '#7AAACE', '#9CD5FF', '#F7F8F0'];

    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    confetti({
        particleCount: 200, spread: 130, startVelocity: 55,
        gravity: 0.75, origin: { x: 0.5, y: 0.4 }, colors,
        shapes: ['circle', 'square'],
    });

    setTimeout(() => {
        confetti({ particleCount: 80, spread: 100, startVelocity: 40, gravity: 0.9, origin: { x: 0.5, y: 0.55 }, colors });
    }, 600);
}

/* ── Mock data ────────────────────────────────────────── */
const transactions = [
    { id: 1, label: 'Grocery Store', amount: -2450, date: 'Today', icon: '🛒', cat: 'Shopping' },
    { id: 2, label: 'Salary Credit', amount: 45000, date: 'Yesterday', icon: '💰', cat: 'Income' },
    { id: 3, label: 'Electric Bill', amount: -1890, date: '18 Feb', icon: '⚡', cat: 'Utilities' },
    { id: 4, label: 'Freelance Payment', amount: 12000, date: '16 Feb', icon: '💼', cat: 'Income' },
    { id: 5, label: 'Restaurant', amount: -780, date: '15 Feb', icon: '🍽️', cat: 'Food' },
];

const spending = [
    { label: 'Shopping', pct: 35, amount: '₹8,200' },
    { label: 'Utilities', pct: 22, amount: '₹5,100' },
    { label: 'Food & Dining', pct: 18, amount: '₹4,200' },
    { label: 'Transport', pct: 12, amount: '₹2,800' },
    { label: 'Others', pct: 13, amount: '₹3,000' },
];

/* ── Animation variants ───────────────────────────────── */
const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardFade = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ── Sidebar icon ─────────────────────────────────────── */
const SIcon = ({ d, active }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke={active ? '#355872' : '#7AAACE'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
    </svg>
);

export default function Dashboard() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [revealed, setRevealed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const checkBalance = async () => {
        setError('');
        setLoading(true);
        try {
            const { data } = await api.get('/api/balance');
            setBalance(data.balance);
            setRevealed(true);
            setTimeout(fireConfetti, 200);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch balance');
        } finally {
            setLoading(false);
        }
    };

    const formatted = balance !== null
        ? Number(balance).toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })
        : null;

    const nav = [
        { label: 'Dashboard', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', active: true },
        { label: 'Transfers', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 5H4m0 0l4 4m-4-4l4-4' },
        { label: 'Cards', d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
        { label: 'Analytics', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m6 0h6m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0h6V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14' },
        { label: 'Settings', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

    return (
        <motion.div className="relative z-10 flex min-h-screen"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

            {/* ── Mobile toggle ─────────────────────────────── */}
            <button className="fixed top-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl lg:hidden frost-card !p-0"
                onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#355872" strokeWidth="2" strokeLinecap="round">
                    {menuOpen
                        ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                        : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
                    }
                </svg>
            </button>

            {/* ── Sidebar ──────────────────────────────────── */}
            <aside className={`sidebar-frost fixed lg:sticky top-0 left-0 h-screen z-40 flex flex-col py-8 px-4 transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`} style={{ width: 230 }}>
                <div className="flex items-center gap-3 px-3 mb-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: '#355872', boxShadow: '0 4px 14px rgba(53,88,114,0.20)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div>
                        <span className="text-lg font-bold" style={{ color: '#355872' }}>Kodbank</span>
                        <p className="text-[10px] font-medium" style={{ color: '#7AAACE' }}>Smart Banking</p>
                    </div>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {nav.map((n) => (
                        <div key={n.label} className={`nav-frost ${n.active ? 'active' : ''}`}>
                            <SIcon d={n.d} active={n.active} />
                            <span>{n.label}</span>
                        </div>
                    ))}
                </nav>

                <div className="rounded-xl px-4 py-3" style={{ background: 'rgba(156,213,255,0.10)', border: '1px solid rgba(156,213,255,0.20)' }}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#7AAACE' }}>Account</p>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: '#355872' }}>Customer</p>
                </div>
            </aside>

            {menuOpen && <div className="fixed inset-0 z-30 bg-black/15 lg:hidden" onClick={() => setMenuOpen(false)} />}

            {/* ── Main Content ──────────────────────────────── */}
            <main className="flex-1 p-5 lg:p-8 xl:p-10 overflow-y-auto">
                <motion.header className="mb-7" variants={cardFade} initial="hidden" animate="show">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#355872' }}>Dashboard</h1>
                    <p className="mt-1 text-sm font-medium" style={{ color: '#7AAACE' }}>Welcome back — here's your financial overview.</p>
                </motion.header>

                {/* ── Bento Grid ───────────────────────────────── */}
                <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" variants={stagger} initial="hidden" animate="show">

                    {/* ━━ TOTAL BALANCE ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-7 sm:p-8 md:col-span-2 xl:col-span-2" variants={cardFade}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl"
                                style={{ background: '#355872', boxShadow: '0 6px 18px rgba(53,88,114,0.18)' }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7F8F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#355872' }}>Total Balance</p>
                                <p className="text-[11px]" style={{ color: '#7AAACE' }}>Primary account</p>
                            </div>
                        </div>

                        {!revealed ? (
                            <>
                                <p className="text-5xl font-extrabold mb-6 sm:text-6xl" style={{ color: 'rgba(156,213,255,0.3)' }}>₹ ••••••</p>
                                {error && (
                                    <div className="mb-4 rounded-xl px-4 py-3 text-sm"
                                        style={{ background: 'rgba(156,213,255,0.10)', border: '1px solid rgba(156,213,255,0.25)', color: '#355872' }}>
                                        ⚠ {error}
                                    </div>
                                )}
                                <button onClick={checkBalance} disabled={loading}
                                    className="btn-midnight" style={{ maxWidth: 260, width: 'auto', padding: '14px 44px' }}>
                                    {loading ? <span className="spinner" /> : '🔍  Check Balance'}
                                </button>
                            </>
                        ) : (
                            <div className="balance-reveal">
                                <p className="text-5xl font-extrabold sm:text-6xl mb-2" style={{ color: '#355872' }}>{formatted}</p>
                                <p className="text-sm font-medium" style={{ color: '#7AAACE' }}>🎊 Funds secured with Kodbank</p>
                            </div>
                        )}
                    </motion.div>

                    {/* ━━ MONTHLY INCOME ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-6" variants={cardFade}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg"
                                style={{ background: 'rgba(156,213,255,0.12)', border: '1px solid rgba(156,213,255,0.25)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#355872" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#355872' }}>Monthly Income</p>
                        </div>
                        <p className="text-3xl font-extrabold mb-1" style={{ color: '#355872' }}>₹57,000</p>
                        <div className="flex items-center gap-1.5 mt-2">
                            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
                                style={{ background: 'rgba(34,197,94,0.08)', color: '#22C55E' }}>
                                ↑ 12%
                            </span>
                            <span className="text-[11px]" style={{ color: '#7AAACE' }}>vs last month</span>
                        </div>

                        <div className="mt-5 h-px w-full" style={{ background: 'rgba(156,213,255,0.15)' }} />

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-xl p-3" style={{ background: 'rgba(156,213,255,0.06)' }}>
                                <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: '#7AAACE' }}>Salary</p>
                                <p className="text-sm font-bold mt-0.5" style={{ color: '#355872' }}>₹45,000</p>
                            </div>
                            <div className="rounded-xl p-3" style={{ background: 'rgba(156,213,255,0.06)' }}>
                                <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: '#7AAACE' }}>Freelance</p>
                                <p className="text-sm font-bold mt-0.5" style={{ color: '#355872' }}>₹12,000</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ━━ SPENDING ANALYTICS ━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-6" variants={cardFade}>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg"
                                    style={{ background: 'rgba(156,213,255,0.12)', border: '1px solid rgba(156,213,255,0.25)' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#355872" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21.21 15.89A10 10 0 118 2.83" /><path d="M22 12A10 10 0 0012 2v10z" />
                                    </svg>
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#355872' }}>Spending</p>
                            </div>
                            <span className="text-lg font-extrabold" style={{ color: '#355872' }}>₹23.3K</span>
                        </div>
                        <div className="space-y-3.5">
                            {spending.map((d, i) => (
                                <div key={d.label}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="text-[13px] font-medium" style={{ color: '#355872' }}>{d.label}</span>
                                        <span className="text-[11px] font-semibold" style={{ color: '#7AAACE' }}>{d.amount}</span>
                                    </div>
                                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(156,213,255,0.12)' }}>
                                        <motion.div className="h-full rounded-full"
                                            style={{ background: i === 0 ? '#355872' : i === 1 ? '#7AAACE' : '#9CD5FF' }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${d.pct}%` }}
                                            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.3 + i * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ━━ RECENT TRANSACTIONS ━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-6 md:col-span-2 xl:col-span-2" variants={cardFade}>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg"
                                    style={{ background: 'rgba(156,213,255,0.12)', border: '1px solid rgba(156,213,255,0.25)' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#355872" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
                                    </svg>
                                </div>
                                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#355872' }}>Recent Transactions</p>
                            </div>
                            <span className="text-xs font-medium cursor-pointer transition-colors"
                                style={{ color: '#7AAACE' }}
                                onMouseEnter={e => e.target.style.color = '#355872'}
                                onMouseLeave={e => e.target.style.color = '#7AAACE'}>View All →</span>
                        </div>
                        <div className="space-y-2">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-colors duration-200"
                                    style={{ border: '1px solid rgba(156,213,255,0.12)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(156,213,255,0.06)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <div className="flex items-center gap-3.5">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                                            style={{ background: 'rgba(156,213,255,0.08)', border: '1px solid rgba(156,213,255,0.15)' }}>
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold" style={{ color: '#355872' }}>{tx.label}</p>
                                            <p className="text-[11px]" style={{ color: '#7AAACE' }}>{tx.date} · {tx.cat}</p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-bold tabular-nums ${tx.amount > 0 ? 'text-emerald-500' : ''}`}
                                        style={tx.amount < 0 ? { color: '#355872' } : {}}>
                                        {tx.amount > 0 ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ━━ QUICK ACTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-6" variants={cardFade}>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#355872' }}>Quick Actions</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { icon: '💸', label: 'Transfer' },
                                { icon: '📱', label: 'Pay Bills' },
                                { icon: '🏦', label: 'Deposit' },
                                { icon: '📊', label: 'Reports' },
                            ].map((a) => (
                                <button key={a.label}
                                    className="flex flex-col items-center gap-2.5 rounded-xl py-5 cursor-pointer transition-all duration-200 hover:scale-[1.04] active:scale-100"
                                    style={{ background: 'rgba(156,213,255,0.08)', border: '1px solid rgba(156,213,255,0.18)' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(156,213,255,0.15)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(156,213,255,0.08)'}>
                                    <span className="text-2xl">{a.icon}</span>
                                    <span className="text-xs font-semibold" style={{ color: '#355872' }}>{a.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ━━ STATUS BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.div className="frost-card p-5 md:col-span-2 xl:col-span-3" variants={cardFade}>
                        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                            {[
                                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Security', sub: 'AES-256 Encrypted' },
                                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Session', sub: 'Active · JWT Secured' },
                                { icon: 'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3', title: 'Status', sub: 'All Systems Go' },
                            ].map((s) => (
                                <div key={s.title} className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full shrink-0"
                                        style={{ background: '#355872', boxShadow: '0 4px 12px rgba(53,88,114,0.15)' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F7F8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d={s.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#7AAACE' }}>{s.title}</p>
                                        <p className="text-sm font-semibold" style={{ color: '#355872' }}>{s.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </motion.div>
    );
}
