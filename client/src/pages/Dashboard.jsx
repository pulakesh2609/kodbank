import { useState } from 'react';
import confetti from 'canvas-confetti';
import api from '../api';

function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#E50914', '#ff6b6b', '#ffffff', '#ffd700', '#ff4500'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.7 },
            colors,
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.7 },
            colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Big burst in the centre
    confetti({
        particleCount: 150,
        spread: 100,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.5 },
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
            // Fire confetti after a tiny delay for the reveal animation to start
            setTimeout(fireConfetti, 200);
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
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <span style={{ color: '#E50914' }}>Kod</span>bank
                </h1>
                <p className="mt-2 text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Welcome to your dashboard
                </p>
            </div>

            {/* Card */}
            <div className="glass w-full max-w-lg p-8 sm:p-12 text-center">
                {!revealed ? (
                    <>
                        <div
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                            style={{
                                background: 'rgba(229, 9, 20, 0.1)',
                                border: '2px solid rgba(229, 9, 20, 0.25)',
                            }}
                        >
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                <line x1="1" y1="10" x2="23" y2="10" />
                            </svg>
                        </div>

                        <h2 className="mb-2 text-xl font-semibold">Account Overview</h2>
                        <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            Click the button below to securely retrieve your current balance.
                        </p>

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

                        <button onClick={checkBalance} className="btn-primary" disabled={loading}>
                            {loading ? <span className="spinner" /> : '💰  Check Balance'}
                        </button>
                    </>
                ) : (
                    <div className="balance-reveal">
                        <div
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                            style={{
                                background: 'rgba(229, 9, 20, 0.15)',
                                border: '2px solid rgba(229, 9, 20, 0.35)',
                            }}
                        >
                            <span className="text-3xl">🎉</span>
                        </div>

                        <p className="mb-3 text-sm font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Your Balance Is
                        </p>

                        <h2
                            className="text-4xl font-extrabold sm:text-5xl"
                            style={{ color: '#E50914' }}
                        >
                            {formattedBalance}
                        </h2>

                        <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            🎊 Congratulations! Your funds are secure with Kodbank.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
