import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { Search } from "lucide-react";
import Loader from "../components/Loader.jsx";
import Navbar from "../components/Navbar.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskFormModal from "../components/TaskFormModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask
} from "../services/taskService.js";

const filters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!user?._id) return undefined;

    const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");
    socket.emit("join-user-room", user._id);

    socket.on("task-created", (task) => {
      setTasks((current) => [task, ...current.filter((item) => item._id !== task._id)]);
    });

    socket.on("task-updated", (task) => {
      setTasks((current) => current.map((item) => (item._id === task._id ? task : item)));
    });

    socket.on("task-deleted", ({ id }) => {
      setTasks((current) => current.filter((item) => item._id !== id));
    });

    return () => socket.disconnect();
  }, [user?._id]);

  const counters = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((task) => task.status === "completed").length,
      pending: tasks.filter((task) => task.status === "pending").length
    };
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus = status === "all" || task.status === status;
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description?.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, search, status]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleSubmitTask = async (payload) => {
    try {
      setIsSaving(true);
      if (selectedTask) {
        await updateTask(selectedTask._id, payload);
        toast.success("Task updated");
      } else {
        await createTask(payload);
        toast.success("Task created");
      }
      closeModal();
      await loadTasks();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleStatusChange = async (task, nextStatus) => {
    try {
      const updated = await updateTask(task._id, { status: nextStatus });
      setTasks((current) => current.map((item) => (item._id === updated._id ? updated : item)));
      toast.success("Status updated");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar onCreate={openCreateModal} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-medium text-slate-500">Total</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{counters.total}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-medium text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-600">{counters.completed}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-medium text-slate-500">Pending</p>
            <p className="mt-2 text-3xl font-semibold text-amber-600">{counters.pending}</p>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-11 w-full rounded-md border border-slate-200 pl-10 pr-3 outline-none transition focus:border-slate-500"
              placeholder="Search tasks"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setStatus(filter.value)}
                className={`h-10 rounded-md px-3 text-sm font-semibold transition ${
                  status === filter.value
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {isLoading ? (
          <Loader label="Loading tasks" />
        ) : visibleTasks.length === 0 ? (
          <section className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-950">No tasks found</h2>
            <p className="mt-2 text-sm text-slate-500">Create a task or adjust your filters.</p>
          </section>
        ) : (
          <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </section>
        )}
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Dashboard;
