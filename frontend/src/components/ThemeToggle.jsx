import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="relative flex items-center w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300"
      style={{
        backgroundColor: dark ? '#431407' : '#fed7aa',
        '--tw-ring-color': 'var(--brand-ring)',
      }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Track icons */}
      <FiSun  className="absolute left-1.5 h-3.5 w-3.5 text-orange-500" />
      <FiMoon className="absolute right-1.5 h-3.5 w-3.5 text-orange-300" />

      {/* Thumb */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        animate={{ x: dark ? 28 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {dark
          ? <FiMoon className="h-3 w-3 text-orange-700" />
          : <FiSun  className="h-3 w-3 text-orange-500" />
        }
      </motion.div>
    </motion.button>
  );
}
