import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── Inline SVG Phone Illustration ────────────────────── */
function PhoneIllustration() {
    return (
        <svg viewBox="0 0 320 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[320px] drop-shadow-2xl">
            {/* Hand */}
            <ellipse cx="160" cy="510" rx="130" ry="40" fill="#F0D6C0" opacity="0.3" />
            <path d="M80,380 Q60,420 70,480 Q80,520 140,530 L180,530 Q240,520 250,480 Q260,420 240,380 Z" fill="#E8C4A8" />
            <path d="M80,380 Q75,400 78,420" stroke="#D4A882" strokeWidth="1.5" fill="none" opacity="0.5" />

            {/* Phone body */}
            <rect x="85" y="40" width="150" height="300" rx="24" fill="#1E293B" />
            <rect x="85" y="40" width="150" height="300" rx="24" stroke="#334155" strokeWidth="1" />

            {/* Screen */}
            <rect x="93" y="52" width="134" height="276" rx="16" fill="#FFFFFF" />

            {/* Status bar */}
            <rect x="93" y="52" width="134" height="30" rx="16" fill="#2563EB" />
            <text x="110" y="72" fill="white" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Kodbank</text>
            <circle cx="206" cy="67" r="3" fill="rgba(255,255,255,0.6)" />
            <rect x="195" y="65" width="8" height="4" rx="1" fill="rgba(255,255,255,0.6)" />

            {/* Balance card */}
            <rect x="101" y="90" width="118" height="60" rx="10" fill="url(#cardGrad)" />
            <text x="113" y="107" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="Inter, sans-serif">Total Balance</text>
            <text x="113" y="127" fill="white" fontSize="15" fontWeight="800" fontFamily="Inter, sans-serif">₹1,00,000</text>
            <text x="113" y="141" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="Inter, sans-serif">↑ 12% this month</text>

            {/* Quick actions */}
            <rect x="101" y="158" width="55" height="36" rx="8" fill="#EFF6FF" />
            <text x="112" y="180" fill="#2563EB" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">Transfer</text>
            <rect x="164" y="158" width="55" height="36" rx="8" fill="#EFF6FF" />
            <text x="179" y="180" fill="#2563EB" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">Pay</text>

            {/* Transaction rows */}
            <text x="101" y="210" fill="#334155" fontSize="7" fontWeight="600" fontFamily="Inter, sans-serif">Recent</text>
            <rect x="101" y="218" width="118" height="24" rx="6" fill="#F8FAFC" />
            <text x="109" y="233" fill="#334155" fontSize="6.5" fontFamily="Inter, sans-serif">Grocery Store</text>
            <text x="193" y="233" fill="#EF4444" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">-₹2,450</text>

            <rect x="101" y="246" width="118" height="24" rx="6" fill="#F8FAFC" />
            <text x="109" y="261" fill="#334155" fontSize="6.5" fontFamily="Inter, sans-serif">Salary Credit</text>
            <text x="186" y="261" fill="#22C55E" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">+₹45,000</text>

            <rect x="101" y="274" width="118" height="24" rx="6" fill="#F8FAFC" />
            <text x="109" y="289" fill="#334155" fontSize="6.5" fontFamily="Inter, sans-serif">Electric Bill</text>
            <text x="196" y="289" fill="#EF4444" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">-₹1,890</text>

            {/* Bottom nav */}
            <rect x="93" y="304" width="134" height="24" rx="0 0 16 16" fill="#F8FAFC" />
            <circle cx="128" cy="316" r="4" fill="#2563EB" />
            <circle cx="160" cy="316" r="4" fill="#CBD5E1" />
            <circle cx="192" cy="316" r="4" fill="#CBD5E1" />

            {/* Notch */}
            <rect x="135" y="44" width="50" height="5" rx="2.5" fill="#0F172A" />

            <defs>
                <linearGradient id="cardGrad" x1="101" y1="90" x2="219" y2="150">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
            </defs>
        </svg>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Landing() {
    return (
        <motion.div
            className="relative z-10 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
        >
            {/* ── Navbar ──────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-400">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-900">Kodbank</span>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        {['Home', 'About us', 'Features', 'Security'].map((l) => (
                            <a key={l} href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">{l}</a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <Link
                        to="/login"
                        className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-all hover:-translate-y-0.5"
                    >
                        Log In
                    </Link>
                </div>
            </header>

            {/* ── Hero Section ───────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-6 pt-16 pb-32 lg:pt-24 lg:pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Copy */}
                    <div>
                        <motion.div
                            className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 mb-6"
                            variants={fadeUp} initial="hidden" animate="show" custom={0}
                        >
                            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-semibold text-blue-700">Trusted by 2M+ customers</span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
                            style={{ color: '#1E3A8A' }}
                            variants={fadeUp} initial="hidden" animate="show" custom={1}
                        >
                            Secure.<br />
                            Simple.<br />
                            Smart.<br />
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Banking.</span>
                        </motion.h1>

                        {/* CTA Buttons — side by side, near the headline */}
                        <motion.div
                            className="mt-8 flex items-center gap-4"
                            variants={fadeUp} initial="hidden" animate="show" custom={2}
                        >
                            <Link to="/register" className="btn-blue" style={{ width: 'auto', padding: '15px 36px' }}>
                                Open an Account
                            </Link>
                            <Link to="/login" className="btn-outline" style={{ width: 'auto', padding: '15px 36px' }}>
                                Log In
                            </Link>
                        </motion.div>

                        <motion.p
                            className="mt-8 text-lg leading-relaxed max-w-lg"
                            style={{ color: '#64748B' }}
                            variants={fadeUp} initial="hidden" animate="show" custom={3}
                        >
                            Experience next-generation banking with military-grade security, instant transfers, and intelligent financial insights — all at your fingertips.
                        </motion.p>

                        {/* Trust signals */}
                        <motion.div
                            className="mt-12 flex items-center gap-8"
                            variants={fadeUp} initial="hidden" animate="show" custom={4}
                        >
                            {[
                                { value: '₹500Cr+', label: 'Secured' },
                                { value: '2M+', label: 'Users' },
                                { value: '99.9%', label: 'Uptime' },
                            ].map((s) => (
                                <div key={s.label}>
                                    <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                                    <p className="text-xs text-slate-400 font-medium">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right — Phone illustration */}
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        variants={fadeUp} initial="hidden" animate="show" custom={2}
                    >
                        <PhoneIllustration />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
