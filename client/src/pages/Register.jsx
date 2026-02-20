import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ uid: '', username: '', email: '', password: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        <motion.div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10"
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="glass-auth w-full max-w-[440px] p-9 sm:p-11">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ background: '#355872', boxShadow: '0 8px 24px rgba(53,88,114,0.20)' }}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F7F8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#355872' }}>Create Account</h1>
                    <p className="mt-1.5 text-sm" style={{ color: '#7AAACE' }}>Start your banking journey with Kodbank</p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl px-4 py-3 text-sm" style={{ background: 'rgba(156,213,255,0.10)', border: '1px solid rgba(156,213,255,0.25)', color: '#355872' }}>
                        ⚠ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="uid" className="input-frost" placeholder="User ID (e.g. USR001)" value={form.uid} onChange={handleChange} required autoComplete="off" />
                    <input name="username" className="input-frost" placeholder="Username" value={form.username} onChange={handleChange} required autoComplete="off" />
                    <input name="email" type="email" className="input-frost" placeholder="Email address" value={form.email} onChange={handleChange} required autoComplete="email" />
                    <input name="password" type="password" className="input-frost" placeholder="Password" value={form.password} onChange={handleChange} required autoComplete="new-password" />
                    <input name="phone" className="input-frost" placeholder="Phone number (optional)" value={form.phone} onChange={handleChange} autoComplete="tel" />
                    <button type="submit" className="btn-midnight mt-3" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm" style={{ color: '#7AAACE' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold transition-colors" style={{ color: '#355872' }}>Sign in</Link>
                </p>
            </div>
        </motion.div>
    );
}
