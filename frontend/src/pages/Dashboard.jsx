import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiSearch, FiFilter, FiCheckSquare,
  FiClock, FiList, FiAlertCircle, FiRefreshCw,
  FiTrendingUp, FiTarget, FiActivity,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import TaskFormModal from '../components/TaskFormModal';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import EmptyIllustration from '../components/illustrations/EmptyIllustration';
import toast from 'react-hot-toast';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: .4, ease: 'easeOut' } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: .08 } } };
const cardVariant = {
  hidden: { opacity: 0, scale: .94, y: 12 },
  show:   { opacity: 1, scale: 1,   y: 0,  transition: { duration: .35, ease: 'easeOut' } },
  exit:   { opacity: 0, scale: .94, y: -8, transition: { duration: .2 } },
};

const STATUSES = [
  { value: '',            label: 'All',         icon: <FiList className="h-4 w-4" /> },
  { value: 'todo',        label: 'To Do',       icon: <FiAlertCircle className="h-4 w-4" /> },
  { value: 'in-progress', label: 'In Progress', icon: <FiClock className="h-4 w-4" /> },
  { value: 'completed',   label: 'Completed',   icon: <FiCheckSquare className="h-4 w-4" /> },
];
const PRIORITIES = [
  { value: '', label: 'All Priorities' },
  { value: 'high',   label: '🔴 High' },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'low',    label: '🟢 Low' },
];
const SORTS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt',  label: 'Oldest First' },
  { value: 'dueDate',    label: 'Due Date' },
  { value: '-priority',  label: 'Priority' },
];

function Counter({ value }) {
  return (
    <motion.span key={value} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
      {value}
    </motion.span>
  );
}

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-1.5 rounded-full overflow-hidden mt-2" style={{ backgroundColor: 'var(--bg-muted)' }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: 'var(--brand)' }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: .8, ease: 'easeOut', delay: .3 }}
      />
    </div>
  );
}

export default function Dashboard() {
  const { user, socket } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshSpin, setRefreshSpin] = useState(false);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sort, setSort] = useState('-createdAt');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks({ status: statusFilter, priority: priorityFilter, search, sort });
      setTasks(data.tasks);
      setStats(data.stats);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, search, sort]);

  useEffect(() => {
    const t = setTimeout(fetchTasks, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchTasks, search]);

  useEffect(() => {
    if (!socket) return;
    const onCreated = (task) => setTasks((p) => [task, ...p]);
    const onUpdated = (task) => setTasks((p) => p.map((t) => (t._id === task._id ? task : t)));
    const onDeleted = ({ _id }) => setTasks((p) => p.filter((t) => t._id !== _id));
    socket.on('task:created', onCreated);
    socket.on('task:updated', onUpdated);
    socket.on('task:deleted', onDeleted);
    return () => {
      socket.off('task:created', onCreated);
      socket.off('task:updated', onUpdated);
      socket.off('task:deleted', onDeleted);
    };
  }, [socket]);

  const handleRefresh = async () => {
    setRefreshSpin(true);
    await fetchTasks();
    setTimeout(() => setRefreshSpin(false), 600);
  };

  const handleCreate = () => { setEditingTask(null); setModalOpen(true); };
  const handleEdit   = (task) => { setEditingTask(task); setModalOpen(true); };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask._id, formData);
        toast.success('Task updated');
      } else {
        await taskService.createTask(formData);
        toast.success('Task created');
      }
      setModalOpen(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await taskService.updateStatus(id, status);
      fetchTasks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const completionPct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statCards = [
    { label: 'Total',       value: stats.total,      icon: FiTarget,    barVal: stats.total,      barMax: stats.total },
    { label: 'To Do',       value: stats.todo,        icon: FiList,      barVal: stats.todo,       barMax: stats.total },
    { label: 'In Progress', value: stats.inProgress,  icon: FiActivity,  barVal: stats.inProgress, barMax: stats.total },
    { label: 'Completed',   value: stats.completed,   icon: FiTrendingUp,barVal: stats.completed,  barMax: stats.total },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome */}
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <motion.div variants={fadeUp}>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              Good day, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              {completionPct === 100 && stats.total > 0
                ? '🎉 All tasks completed! Great work.'
                : `You've completed ${completionPct}% of your tasks.`}
            </p>
          </motion.div>
          <motion.button variants={fadeUp} onClick={handleCreate}
            className="btn-primary rounded-xl px-5 py-2.5"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}>
            <FiPlus className="h-5 w-5" />
            New Task
          </motion.button>
        </motion.div>

        {/* Overall progress */}
        {stats.total > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
            className="card p-4 mb-6 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium" style={{ color: 'var(--text)' }}>Overall Progress</span>
                <span className="font-semibold" style={{ color: 'var(--brand)' }}>{completionPct}%</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-muted)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--brand), #c2410c)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: .4 }}
                />
              </div>
            </div>
            <div className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--text)' }}>{stats.completed}</span> / {stats.total}
            </div>
          </motion.div>
        )}

        {/* Stat cards */}
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <motion.div key={s.label} variants={fadeUp}
              whileHover={{ y: -3, boxShadow: '0 10px 24px -6px rgba(0,0,0,.12)' }}
              className="card p-4 cursor-default">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <s.icon className="h-4 w-4" style={{ color: 'var(--brand)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--brand)' }}>
                <Counter value={s.value} />
              </p>
              <ProgressBar value={s.barVal} max={s.barMax} />
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}
          className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
              <input type="text" className="input pl-9" placeholder="Search tasks…"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--text-muted)' }} />
              <select className="input pl-9 pr-8 min-w-[150px]" value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </div>
            <select className="input min-w-[150px]" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <motion.button onClick={handleRefresh} className="btn-ghost px-3"
              title="Refresh" aria-label="Refresh tasks"
              animate={{ rotate: refreshSpin ? 360 : 0 }} transition={{ duration: .6 }}>
              <FiRefreshCw className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
            {STATUSES.map((s) => (
              <motion.button key={s.value} onClick={() => setStatusFilter(s.value)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors relative"
                style={{ color: statusFilter === s.value ? 'white' : 'var(--text-muted)' }}
                whileTap={{ scale: .95 }}>
                {statusFilter === s.value && (
                  <motion.div layoutId="status-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: 'var(--brand)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10 flex items-center gap-1.5">{s.icon}{s.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Task grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader size="lg" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading your tasks…</p>
          </div>
        ) : tasks.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
            <EmptyIllustration className="w-44 mx-auto mb-6" />
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-muted)' }}>No tasks found</h3>
            <p className="mt-1 mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
              {search || statusFilter || priorityFilter ? 'Try adjusting your filters' : 'Create your first task to get started'}
            </p>
            {!search && !statusFilter && !priorityFilter && (
              <motion.button onClick={handleCreate} className="btn-primary rounded-xl px-6 py-2.5"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }}>
                <FiPlus className="h-4 w-4" /> Create Task
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div key={task._id} variants={cardVariant} layout exit="exit">
                  <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {modalOpen && (
          <TaskFormModal task={editingTask} onClose={() => setModalOpen(false)}
            onSubmit={handleSubmit} loading={submitting} />
        )}
      </AnimatePresence>
    </div>
  );
}
