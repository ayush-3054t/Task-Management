import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  FiCheckSquare, FiZap, FiShield, FiTrendingUp,
  FiArrowRight, FiClock, FiUsers,
} from 'react-icons/fi';
import Navbar from '../components/Navbar';
import HeroIllustration from '../components/illustrations/HeroIllustration';

/* ── Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: .5, ease: 'easeOut' } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: .11 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: .9 },
  show:   { opacity: 1, scale: 1, transition: { duration: .4, ease: 'easeOut' } },
};

/* ── Features data ── */
const features = [
  { icon: FiZap,         title: 'Real-time Sync',    desc: 'Changes appear instantly across all sessions via WebSockets.' },
  { icon: FiCheckSquare, title: 'Smart Filters',     desc: 'Filter by status, priority, or search to find any task fast.' },
  { icon: FiShield,      title: 'Secure Auth',       desc: 'JWT-based login keeps your data private and protected.' },
  { icon: FiTrendingUp,  title: 'Progress Tracking', desc: 'Visual stats and progress bars show how much you have done.' },
  { icon: FiClock,       title: 'Due Date Alerts',   desc: 'Colour-coded deadlines so you never miss an important task.' },
  { icon: FiUsers,       title: 'Multi-device',      desc: 'Your tasks stay in sync no matter which device you use.' },
];

function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'} className={className}>
      {children}
    </motion.div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-mesh relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl blob"
          style={{ backgroundColor: 'rgba(251,146,60,.25)' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl blob blob-delay-2"
          style={{ backgroundColor: 'rgba(234,88,12,.18)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Copy */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center lg:text-left">
              <motion.div variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border"
                style={{ backgroundColor: 'var(--brand-lt)', borderColor: 'var(--border)', color: 'var(--brand)' }}
              >
                <FiZap className="h-4 w-4" />
                MERN Stack · Real-time
              </motion.div>

              <motion.h1 variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6"
                style={{ color: 'var(--text)' }}
              >
                Manage tasks<br />
                with <span className="gradient-text">clarity</span>
              </motion.h1>

              <motion.p variants={fadeUp}
                className="text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                TaskFlow helps you organise work, track progress, and hit every deadline — all in one clean interface.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="btn-primary btn-glow text-base px-8 py-3 rounded-xl">
                  Start for free <FiArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-8 py-3 rounded-xl">
                  Sign in
                </Link>
              </motion.div>
            </motion.div>

            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .7, ease: 'easeOut', delay: .2 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HeroIllustration className="w-full max-w-lg mx-auto drop-shadow-2xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
                Features
              </p>
              <h2 className="text-4xl font-bold" style={{ color: 'var(--text)' }}>
                Everything you need to stay productive
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  variants={scaleIn}
                  whileHover={{ y: -4, boxShadow: '0 16px 32px -8px rgba(0,0,0,.14)' }}
                  className="card p-6 cursor-default"
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--brand-lt)', color: 'var(--brand)' }}
                  >
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: 'var(--text)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, var(--brand) 0%, #c2410c 100%)' }}
        />
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-white/5 blur-3xl" />

        <Section className="relative max-w-2xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp}>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
              Ready to get organised?
            </h2>
            <p className="text-orange-100 text-lg mb-8">
              Create your free account and start managing tasks today.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white font-bold px-10 py-4 rounded-2xl text-base hover:bg-orange-50 transition-colors shadow-xl"
              style={{ color: 'var(--brand)' }}
            >
              Get started free <FiArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </Section>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-2 font-semibold" style={{ color: 'var(--text)' }}>
            <FiCheckSquare className="h-4 w-4" style={{ color: 'var(--brand)' }} />
            TaskFlow
          </div>
          <span>MongoDB · Express · React · Node.js</span>
          <span>© {new Date().getFullYear()} TaskFlow</span>
        </div>
      </footer>
    </div>
  );
}
