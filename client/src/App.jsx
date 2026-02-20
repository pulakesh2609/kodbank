import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/* ── Framer Motion Animated Waves ─────────────────────── */
const wavePath1 = [
  'M0,300 C320,420 640,200 960,310 C1120,370 1300,220 1440,290 L1440,560 L0,560 Z',
  'M0,260 C320,160 640,380 960,250 C1120,190 1300,360 1440,310 L1440,560 L0,560 Z',
  'M0,340 C320,240 640,360 960,240 C1120,310 1300,200 1440,270 L1440,560 L0,560 Z',
  'M0,300 C320,420 640,200 960,310 C1120,370 1300,220 1440,290 L1440,560 L0,560 Z',
];

const wavePath2 = [
  'M0,260 C360,360 720,180 1080,280 C1260,340 1380,220 1440,260 L1440,460 L0,460 Z',
  'M0,310 C360,200 720,340 1080,220 C1260,270 1380,360 1440,290 L1440,460 L0,460 Z',
  'M0,280 C360,380 720,220 1080,320 C1260,240 1380,300 1440,340 L1440,460 L0,460 Z',
  'M0,260 C360,360 720,180 1080,280 C1260,340 1380,220 1440,260 L1440,460 L0,460 Z',
];

const wavePath3 = [
  'M0,220 C480,300 960,140 1440,240 L1440,360 L0,360 Z',
  'M0,280 C480,180 960,320 1440,200 L1440,360 L0,360 Z',
  'M0,240 C480,320 960,180 1440,280 L1440,360 L0,360 Z',
  'M0,220 C480,300 960,140 1440,240 L1440,360 L0,360 Z',
];

function FlowingWaves() {
  return (
    <div className="wave-wrap">
      {/* Layer 1 — deep, slow */}
      <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 560" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7AAACE" />
            <stop offset="100%" stopColor="#9CD5FF" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#wg1)"
          opacity={0.35}
          animate={{ d: wavePath1 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Layer 2 — mid speed */}
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: '80%' }} viewBox="0 0 1440 460" preserveAspectRatio="none">
        <motion.path
          fill="rgba(156,213,255,0.25)"
          animate={{ d: wavePath2 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>

      {/* Layer 3 — fast, lightest */}
      <svg className="absolute bottom-0 left-0 w-full" style={{ height: '60%' }} viewBox="0 0 1440 360" preserveAspectRatio="none">
        <motion.path
          fill="rgba(122,170,206,0.15)"
          animate={{ d: wavePath3 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FlowingWaves />
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
