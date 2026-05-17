import { CalendarDays, CheckCircle2, Pencil, Trash2 } from "lucide-react";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  "in-progress": "bg-blue-50 text-blue-700 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200"
};

const statusLabels = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed"
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-slate-950">{task.title}</h3>
          <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-slate-600">
            {task.description || "No description provided."}
          </p>
        </div>
        {task.status === "completed" && (
          <CheckCircle2 className="shrink-0 text-emerald-600" size={22} />
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusStyles[task.status]}`}>
          {statusLabels[task.status]}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          <CalendarDays size={14} />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task, event.target.value)}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-50"
            aria-label="Edit task"
          >
            <Pencil size={17} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-rose-200 text-rose-600 transition hover:bg-rose-50"
            aria-label="Delete task"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
