import { X } from "lucide-react";
import { useEffect, useState } from "react";

const initialState = {
  title: "",
  description: "",
  status: "pending",
  dueDate: ""
};

const toDateInputValue = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
};

const TaskFormModal = ({ isOpen, task, onClose, onSubmit, isSaving }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "pending",
        dueDate: toDateInputValue(task.dueDate)
      });
    } else {
      setForm(initialState);
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.dueDate) nextErrors.dueDate = "Due date is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/45 px-4 py-6">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-slate-500"
              placeholder="Finish project brief"
            />
            {errors.title && <p className="mt-1 text-sm text-rose-600">{errors.title}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 w-full resize-none rounded-md border border-slate-200 px-3 py-2 outline-none transition focus:border-slate-500"
              placeholder="Add useful details"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="mt-1 h-11 w-full rounded-md border border-slate-200 bg-white px-3 outline-none transition focus:border-slate-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="dueDate">
                Due date
              </label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-slate-500"
              />
              {errors.dueDate && <p className="mt-1 text-sm text-rose-600">{errors.dueDate}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="h-11 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
