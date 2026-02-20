import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── Phone Illustration ───────────────────────────────── */
function PhoneIllustration() {
    return (
        <svg viewBox="0 0 320 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[300px] drop-shadow-2xl">
            <ellipse cx="160" cy="510" rx="130" ry="40" fill="#E8C4A8" opacity="0.25" />
            <path d="M80,380 Q60,420 70,480 Q80,520 140,530 L180,530 Q240,520 250,480 Q260,420 240,380 Z" fill="#E8C4A8" />
            <rect x="85" y="40" width="150" height="300" rx="24" fill="#1E293B" />
            <rect x="93" y="52" width="134" height="276" rx="16" fill="#F7F8F0" />
            <rect x="93" y="52" width="134" height="30" rx="16" fill="#355872" />
            <text x="110" y="72" fill="#F7F8F0" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Kodbank</text>
            <rect x="101" y="90" width="118" height="60" rx="10" fill="url(#cg)" />
            <text x="113" y="107" fill="rgba(255,255,255,0.8)" fontSize="7" fontFamily="Inter, sans-serif">Total Balance</text>
            <text x="113" y="127" fill="white" fontSize="15" fontWeight="800" fontFamily="Inter, sans-serif">₹1,00,000</text>
            <text x="113" y="141" fill="rgba(255,255,255,0.6)" fontSize="6" fontFamily="Inter, sans-serif">↑ 12% this month</text>
            <rect x="101" y="158" width="55" height="36" rx="8" fill="rgba(156,213,255,0.15)" />
            <text x="112" y="180" fill="#355872" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">Transfer</text>
            <rect x="164" y="158" width="55" height="36" rx="8" fill="rgba(156,213,255,0.15)" />
            <text x="180" y="180" fill="#355872" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">Pay</text>
            <text x="101" y="210" fill="#355872" fontSize="7" fontWeight="600" fontFamily="Inter, sans-serif">Recent</text>
            {[218, 246, 274].map((y, i) => (
                <rect key={i} x="101" y={y} width="118" height="24" rx="6" fill="rgba(156,213,255,0.08)" />
            ))}
            <text x="109" y="233" fill="#355872" fontSize="6.5" fontFamily="Inter, sans-serif">Grocery Store</text>
            <text x="109" y="261" fill="#355872" fontSize="6.5" fontFamily="Inter, sans-serif">Salary Credit</text>
            <text x="109" y="289" fill="#355872" fontSize="6.5" fontFamily="Inter, sans-serif">Electric Bill</text>
            <rect x="135" y="44" width="50" height="5" rx="2.5" fill="#0F172A" />
            <defs><linearGradient id="cg" x1="101" y1="90" x2="219" y2="150"><stop offset="0%" stopColor="#355872" /><stop offset="100%" stopColor="#7AAACE" /></linearGradient></defs>
        </svg>
    );
}

const fade = {
    hidden: { opacity: 0, y: 22 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Landing() {
    return (
        <motion.div className="relative z-10 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.4 }}>
            {/* ── Navbar ──────────────────────────────────────── */}
            <header className="sticky top-0 z-50 border-b" style={{ background: 'rgba(247,248,240,0.80)', backdropFilter: 'blur(20px)', borderColor: 'rgba(156,213,255,0.20)' }}>
                <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: '#355872' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold" style={{ color: '#355872' }}>Kodbank</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {['Home', 'About us', 'Features', 'Security'].map((l) => (
                            <a key={l} href="#" className="text-sm font-medium transition-colors" style={{ color: '#7AAACE' }}
                                onMouseEnter={e => e.target.style.color = '#355872'}
                                onMouseLeave={e => e.target.style.color = '#7AAACE'}>{l}</a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link to="/login" className="rounded-xl border-2 px-5 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
                            style={{ borderColor: '#355872', color: '#355872' }}>Log In</Link>
                        <Link to="/register" className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                            style={{ background: '#355872', boxShadow: '0 4px 14px rgba(53,88,114,0.20)' }}>Open Account</Link>
                    </div>
                </div>
            </header>

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="mx-auto max-w-7xl px-6 pt-16 pb-32 lg:pt-20 lg:pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <motion.div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
                            style={{ background: 'rgba(156,213,255,0.12)', border: '1px solid rgba(156,213,255,0.25)' }}
                            variants={fade} initial="hidden" animate="show" custom={0}>
                            <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: '#7AAACE' }} />
                            <span className="text-xs font-semibold" style={{ color: '#355872' }}>Trusted by 2M+ customers</span>
                        </motion.div>

                        <motion.h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
                            style={{ color: '#355872' }}
                            variants={fade} initial="hidden" animate="show" custom={1}>
                            Secure.<br />Simple.<br />Smart.<br />
                            <span style={{ color: '#7AAACE' }}>Banking.</span>
                        </motion.h1>

                        {/* CTA Buttons — directly below headline, no card/border */}
                        <motion.div className="mt-8 flex items-center gap-4"
                            variants={fade} initial="hidden" animate="show" custom={2}>
                            <Link to="/register" className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-bold text-white transition-all hover:-translate-y-1"
                                style={{ background: '#355872', boxShadow: '0 6px 20px rgba(53,88,114,0.22)' }}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                                </svg>
                                Open an Account
                            </Link>
                            <Link to="/login" className="flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[15px] font-bold transition-all hover:-translate-y-0.5"
                                style={{ color: '#355872' }}>
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                                </svg>
                                Log In
                            </Link>
                        </motion.div>

                        <motion.p className="mt-10 text-lg leading-relaxed max-w-lg" style={{ color: '#7AAACE' }}
                            variants={fade} initial="hidden" animate="show" custom={3}>
                            Experience next-generation banking with military-grade security, instant transfers, and intelligent financial insights.
                        </motion.p>

                        <motion.div className="mt-10 flex items-center gap-8" variants={fade} initial="hidden" animate="show" custom={4}>
                            {[{ v: '₹500Cr+', l: 'Secured' }, { v: '2M+', l: 'Users' }, { v: '99.9%', l: 'Uptime' }].map((s) => (
                                <div key={s.l}>
                                    <p className="text-2xl font-extrabold" style={{ color: '#355872' }}>{s.v}</p>
                                    <p className="text-xs font-medium" style={{ color: '#7AAACE' }}>{s.l}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div className="flex justify-center lg:justify-end" variants={fade} initial="hidden" animate="show" custom={2}>
                        <PhoneIllustration />
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
}
