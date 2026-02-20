import { useState } from 'react';
import confetti from 'canvas-confetti';
import api from '../api';

function fireConfetti() {
    const duration = 3500;
    const end = Date.now() + duration;

    // Monochrome palette — whites, silvers, light greys
    const colors = ['#ffffff', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#d4d4d4'];

    (function frame() {
        confetti({
            particleCount: 4,
            angle: 60,
            spread: 65,
            origin: { x: 0, y: 0.65 },
            colors,
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 65,
            origin: { x: 1, y: 0.65 },
            colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Big centre burst
    confetti({
        particleCount: 180,
        spread: 120,
        startVelocity: 50,
        gravity: 0.8,
        origin: { x: 0.5, y: 0.45 },
        colors,
    });
}

export default function Dashboard() {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [revealed, setRevealed] = useState(false);

    const checkBalance = async () => {
        setError('');
        setLoading(true);
        try {
            const { data } = await api.get('/api/balance');
            setBalance(data.balance);
            setRevealed(true);
            setTimeout(fireConfetti, 250);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch balance');
        } finally {
            setLoading(false);
        }
    };

    const formattedBalance = balance !== null
        ? Number(balance).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        })
        : null;

    return (
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Kodbank
                </h1>
                <p className="mt-2 text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Welcome to your dashboard
                </p>
            </div>

            {/* Card */}
            <div className="glass w-full max-w-lg p-8 sm:p-12 text-center">
                {!revealed ? (
                    <>
                        {/* Icon */}
                        <div
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                <line x1="1" y1="10" x2="23" y2="10" />
                            </svg>
                        </div>

                        <h2 className="mb-2 text-xl font-semibold text-white">Account Overview</h2>
                        <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>
                            Click the button below to securely retrieve your current balance.
                        </p>

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

                        <button onClick={checkBalance} className="btn-primary" disabled={loading}>
                            {loading ? <span className="spinner" /> : 'Check Balance'}
                        </button>
                    </>
                ) : (
                    <div className="balance-reveal">
                        {/* Celebration icon */}
                        <div
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                            }}
                        >
                            <span className="text-3xl">🎉</span>
                        </div>

                        <p
                            className="mb-3 text-xs font-medium uppercase tracking-[0.2em]"
                            style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                            Your Balance Is
                        </p>

                        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
                            {formattedBalance}
                        </h2>

                        <div className="divider" />

                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            🎊 Congratulations! Your funds are secure with Kodbank.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
