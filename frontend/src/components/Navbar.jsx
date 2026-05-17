import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckSquare, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'}>
            <motion.div
              className="flex items-center gap-2 font-bold text-xl"
              style={{ color: 'var(--brand)' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: .97 }}
            >
              <FiCheckSquare className="h-6 w-6" />
              <span>TaskFlow</span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <>
                <div
                  className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border"
                  style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: 'var(--brand)' }}
                  >
                    {user.name[0].toUpperCase()}
                  </div>
                  {user.name}
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                  whileTap={{ scale: .95 }}
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.span className="btn-ghost text-sm" whileTap={{ scale: .95 }}>
                    Login
                  </motion.span>
                </Link>
                <Link to="/register">
                  <motion.span
                    className="btn-primary text-sm rounded-xl"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: .97 }}
                  >
                    Get Started
                  </motion.span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="sm:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              className="p-2 rounded-lg"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: .9 }}
            >
              {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: .2 }}
              className="sm:hidden overflow-hidden pb-4 space-y-2"
            >
              {user ? (
                <>
                  <p className="text-sm px-2 py-1 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <FiUser className="h-4 w-4" /> {user.name}
                  </p>
                  <button onClick={handleLogout} className="w-full btn-secondary text-sm">
                    <FiLogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block btn-ghost text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="block btn-primary text-sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
