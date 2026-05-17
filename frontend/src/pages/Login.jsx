import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import AuthIllustration from '../components/illustrations/AuthIllustration';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: .45, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .1 } } };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--brand) 0%, #c2410c 100%)' }}
      >
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, scale: .9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .7 }}
          className="relative z-10 text-center"
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            <AuthIllustration className="w-72 mx-auto mb-8" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">Welcome back</h2>
          <p className="text-orange-100 max-w-xs mx-auto">
            Sign in to access your tasks and pick up right where you left off.
          </p>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="w-full max-w-md">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 font-bold text-2xl" style={{ color: 'var(--brand)' }}>
              <FiCheckSquare className="h-7 w-7" />
              TaskFlow
            </Link>
            <h1 className="mt-4 text-2xl font-bold" style={{ color: 'var(--text)' }}>Sign in to your account</h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Enter your credentials to continue</p>
          </motion.div>

          <motion.div variants={fadeUp} className="card p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="label">Email address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                  <input id="email" name="email" type="email" className="input pl-10"
                    placeholder="you@example.com" value={form.email} onChange={handleChange}
                    required autoComplete="email" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                  <input id="password" name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input pl-10 pr-10"
                    placeholder="••••••••" value={form.password} onChange={handleChange}
                    required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <motion.button type="submit" className="btn-primary w-full py-2.5 rounded-xl text-base"
                disabled={loading} whileTap={{ scale: .97 }}>
                {loading ? <Loader size="sm" /> : <><span>Sign In</span><FiArrowRight className="h-4 w-4" /></>}
              </motion.button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold hover:underline" style={{ color: 'var(--brand)' }}>
                Sign up free
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
