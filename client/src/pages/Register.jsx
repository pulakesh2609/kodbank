import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ uid: '', username: '', email: '', password: '', phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
        <motion.div
            className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="glass-light w-full max-w-[440px] p-9 sm:p-11">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-extrabold" style={{ color: '#1E3A8A' }}>
                        Create Account
                    </h1>
                    <p className="mt-1.5 text-sm" style={{ color: '#64748B' }}>
                        Start your banking journey with Kodbank
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        ⚠ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="uid" className="input-light" placeholder="User ID (e.g. USR001)"
                        value={form.uid} onChange={handleChange} required autoComplete="off" />
                    <input name="username" className="input-light" placeholder="Username"
                        value={form.username} onChange={handleChange} required autoComplete="off" />
                    <input name="email" type="email" className="input-light" placeholder="Email address"
                        value={form.email} onChange={handleChange} required autoComplete="email" />
                    <input name="password" type="password" className="input-light" placeholder="Password"
                        value={form.password} onChange={handleChange} required autoComplete="new-password" />
                    <input name="phone" className="input-light" placeholder="Phone number (optional)"
                        value={form.phone} onChange={handleChange} autoComplete="tel" />

                    <button type="submit" className="btn-blue mt-3" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Create Account'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm" style={{ color: '#94A3B8' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Sign in</Link>
                </p>
            </div>
        </motion.div>
    );
}
