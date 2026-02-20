import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
            <div className="glass w-full max-w-md p-8 sm:p-10">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span style={{ color: '#E50914' }}>Kod</span>bank
                    </h1>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        Sign in to your account
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div
                        className="mb-4 rounded-lg px-4 py-3 text-sm"
                        style={{
                            background: 'rgba(229, 9, 20, 0.12)',
                            border: '1px solid rgba(229, 9, 20, 0.3)',
                            color: '#ff6b6b',
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="username"
                        className="input-glow"
                        placeholder="Username"
                        value={form.username}
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

                    <button type="submit" className="btn-primary mt-2" disabled={loading}>
                        {loading ? <span className="spinner" /> : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Don't have an account?{' '}
                    <Link to="/" className="link-red">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
