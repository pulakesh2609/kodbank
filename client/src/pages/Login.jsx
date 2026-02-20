import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/api/login', form);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="relative z-10 flex min-h-screen items-center justify-center px-4"
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
                        Welcome Back
                    </h1>
                    <p className="mt-1.5 text-sm" style={{ color: '#64748B' }}>
                        Sign in to your Kodbank account
                    </p>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                        ⚠ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input name="username" className="input-light" placeholder="Username"
                        value={form.username} onChange={handleChange} required autoComplete="username" />
                    <input name="password" type="password" className="input-light" placeholder="Password"
                        value={form.password} onChange={handleChange} required autoComplete="current-password" />

                    <button type="submit" className="btn-blue mt-3" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Sign In'}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm" style={{ color: '#94A3B8' }}>
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Register</Link>
                </p>
            </div>
        </motion.div>
    );
}
