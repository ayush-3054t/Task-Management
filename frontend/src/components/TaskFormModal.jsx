import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPlus, FiSave } from 'react-icons/fi';
import Loader from './Loader';

const INITIAL_FORM = { title: '', description: '', status: 'todo', priority: 'medium', dueDate: '', tags: '' };

const PRIORITY_META = {
  low:    { label: '🟢 Low',    accent: '#10b981' },
  medium: { label: '🟡 Medium', accent: '#f59e0b' },
  high:   { label: '🔴 High',   accent: '#ef4444' },
};

export default function TaskFormModal({ task, onClose, onSubmit, loading }) {
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    setForm(task ? {
      title:       task.title || '',
      description: task.description || '',
      status:      task.status || 'todo',
      priority:    task.priority || 'medium',
      dueDate:     task.dueDate ? task.dueDate.split('T')[0] : '',
      tags:        task.tags?.join(', ') || '',
    } : INITIAL_FORM);
  }, [task]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title:       form.title.trim(),
      description: form.description.trim(),
      status:      form.status,
      priority:    form.priority,
      dueDate:     form.dueDate || null,
      tags:        form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    });
  };

  const accent = PRIORITY_META[form.priority].accent;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: .92, y: 24 }}
        animate={{ opacity: 1, scale: 1,   y: 0 }}
        exit={{ opacity: 0, scale: .92, y: 24 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        {/* Priority accent strip */}
        <motion.div
          className="h-1.5 w-full"
          animate={{ backgroundColor: accent }}
          transition={{ duration: .3 }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full" animate={{ backgroundColor: accent }} transition={{ duration: .3 }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              {task ? 'Edit Task' : 'New Task'}
            </h2>
          </div>
          <motion.button onClick={onClose}
            className="p-1.5 rounded-lg" style={{ color: 'var(--text-muted)' }}
            aria-label="Close modal"
            whileTap={{ scale: .9, rotate: 90 }} transition={{ duration: .15 }}>
            <FiX className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label htmlFor="title" className="label">
              Title <span className="text-red-500">*</span>
            </label>
            <input id="title" name="title" type="text" className="input"
              placeholder="What needs to be done?"
              value={form.title} onChange={handleChange}
              required maxLength={100} autoFocus />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">Description</label>
            <textarea id="description" name="description" className="input resize-none"
              placeholder="Add more details…" rows={3}
              value={form.description} onChange={handleChange} maxLength={500} />
          </div>

          {/* Priority selector */}
          <div>
            <label className="label">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PRIORITY_META).map(([p, meta]) => (
                <motion.button key={p} type="button"
                  onClick={() => setForm((prev) => ({ ...prev, priority: p }))}
                  className="py-2 rounded-lg border-2 text-sm font-semibold transition-all"
                  style={{
                    borderColor: form.priority === p ? meta.accent : 'var(--border)',
                    backgroundColor: form.priority === p ? `${meta.accent}18` : 'transparent',
                    color: form.priority === p ? meta.accent : 'var(--text-muted)',
                  }}
                  whileTap={{ scale: .95 }}>
                  {meta.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="label">Status</label>
            <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
              <option value="todo">📋 To Do</option>
              <option value="in-progress">⚡ In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="label">Due Date</label>
            <input id="dueDate" name="dueDate" type="date" className="input"
              value={form.dueDate} onChange={handleChange} />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="label">
              Tags <span className="text-xs font-normal" style={{ color: 'var(--text-muted)' }}>(comma separated)</span>
            </label>
            <input id="tags" name="tags" type="text" className="input"
              placeholder="design, frontend, urgent"
              value={form.tags} onChange={handleChange} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <motion.button type="button" onClick={onClose}
              className="btn-secondary flex-1 rounded-xl" whileTap={{ scale: .97 }}>
              Cancel
            </motion.button>
            <motion.button type="submit"
              className="btn-primary flex-1 rounded-xl" disabled={loading} whileTap={{ scale: .97 }}>
              {loading ? <Loader size="sm" /> : (
                <>{task ? <FiSave className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                  {task ? 'Save Changes' : 'Create Task'}</>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
