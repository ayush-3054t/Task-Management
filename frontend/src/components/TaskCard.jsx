import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit2, FiTrash2, FiCalendar, FiTag, FiMoreVertical, FiArrowRight } from 'react-icons/fi';
import { format, isPast, isToday } from 'date-fns';

const STATUS_STYLES = {
  todo:          { bg: 'rgba(234,88,12,.1)',  color: 'var(--brand)' },
  'in-progress': { bg: 'rgba(59,130,246,.1)', color: '#3b82f6' },
  completed:     { bg: 'rgba(16,185,129,.1)', color: '#10b981' },
};
const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };

const PRIORITY_DOT   = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
const PRIORITY_LABEL = { low: '🟢 Low', medium: '🟡 Medium', high: '🔴 High' };
const PRIORITY_BG    = { low: 'rgba(16,185,129,.1)', medium: 'rgba(245,158,11,.1)', high: 'rgba(239,68,68,.1)' };
const PRIORITY_COLOR = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };

const nextStatus = { todo: 'in-progress', 'in-progress': 'completed', completed: 'todo' };

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const dueDateColor = () => {
    if (!task.dueDate) return 'var(--text-muted)';
    const d = new Date(task.dueDate);
    if (task.status === 'completed') return 'var(--text-muted)';
    if (isPast(d) && !isToday(d)) return '#ef4444';
    if (isToday(d)) return '#f59e0b';
    return 'var(--text-muted)';
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -3, boxShadow: '0 12px 28px -6px rgba(0,0,0,.15)' }}
      transition={{ duration: .2 }}
      className={`card p-4 ${task.status === 'completed' ? 'opacity-70' : ''}`}
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full rounded-full mb-3"
        style={{ backgroundColor: PRIORITY_DOT[task.priority] }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <div className="relative mt-1.5 flex-shrink-0">
            <span className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: PRIORITY_DOT[task.priority] }} />
            {task.priority === 'high' && task.status !== 'completed' && (
              <span className="absolute inset-0 rounded-full ping-slow" style={{ backgroundColor: PRIORITY_DOT.high, opacity: .5 }} />
            )}
          </div>
          <h3 className={`font-semibold text-sm leading-snug ${task.status === 'completed' ? 'line-through' : ''}`}
            style={{ color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text)' }}>
            {task.title}
          </h3>
        </div>

        {/* Menu */}
        <div className="relative flex-shrink-0">
          <motion.button onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-md" style={{ color: 'var(--text-muted)' }}
            aria-label="Task options" whileTap={{ scale: .9 }}>
            <FiMoreVertical className="h-4 w-4" />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: .9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: .9, y: -4 }}
                transition={{ duration: .15 }}
                className="absolute right-0 top-7 rounded-xl shadow-xl z-10 min-w-[130px] overflow-hidden border"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button onClick={() => { onEdit(task); setMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm transition-colors"
                  style={{ color: 'var(--text)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <FiEdit2 className="h-3.5 w-3.5" style={{ color: 'var(--brand)' }} /> Edit
                </button>
                <button onClick={() => { onDelete(task._id); setMenuOpen(false); }}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-red-500 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <FiTrash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--brand-lt)', color: 'var(--brand)' }}>
              <FiTag className="h-2.5 w-2.5" />{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-2.5 border-t"
        style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-1 text-xs" style={{ color: dueDateColor() }}>
          {task.dueDate && (
            <><FiCalendar className="h-3 w-3" /><span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span></>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="badge text-xs"
            style={{ backgroundColor: PRIORITY_BG[task.priority], color: PRIORITY_COLOR[task.priority] }}>
            {PRIORITY_LABEL[task.priority]}
          </span>
          <motion.button
            onClick={() => onStatusChange(task._id, nextStatus[task.status])}
            className="badge cursor-pointer flex items-center gap-1 text-xs"
            style={{ backgroundColor: STATUS_STYLES[task.status].bg, color: STATUS_STYLES[task.status].color }}
            title="Click to advance status"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: .95 }}>
            {STATUS_LABELS[task.status]}
            <FiArrowRight className="h-2.5 w-2.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
