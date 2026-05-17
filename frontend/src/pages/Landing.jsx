import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Search,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const previewTasks = [
  {
    title: "Finalize sprint scope",
    status: "In progress",
    meta: "Today",
    tone: "border-blue-200 bg-blue-50 text-blue-700"
  },
  {
    title: "Review launch checklist",
    status: "Pending",
    meta: "Tomorrow",
    tone: "border-amber-200 bg-amber-50 text-amber-700"
  },
  {
    title: "Send product notes",
    status: "Completed",
    meta: "Done",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-700"
  }
];

const Landing = () => {
  const { user } = useAuth();
  const primaryPath = user ? "/dashboard" : "/register";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section
        className="relative min-h-screen overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85')"
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6">
          <nav className="flex items-center justify-between py-5 text-white">
            <Link to="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white text-slate-950">
                <CheckCircle2 size={22} />
              </span>
              <span className="text-lg font-semibold">Task Management</span>
            </Link>
            <div className="flex items-center gap-2">
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-md px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl text-white">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-sm font-medium ring-1 ring-white/20">
                <ShieldCheck size={16} />
                Secure task tracking with JWT authentication
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
                Task Management
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                Plan work, filter priorities, search tasks, and track completion from a responsive dashboard built for daily focus.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={primaryPath}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  {user ? "Open Dashboard" : "Get Started"}
                  <ArrowRight size={18} />
                </Link>
                {!user && (
                  <Link
                    to="/login"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Dashboard preview</p>
                  <h2 className="text-xl font-semibold text-slate-950">Today&apos;s work</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <div className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-16 text-sm leading-10 text-slate-400 sm:w-56">
                    Search
                  </div>
                </div>
              </div>

              <div className="grid gap-3 py-4 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <LayoutDashboard className="text-slate-500" size={19} />
                  <p className="mt-3 text-2xl font-semibold">12</p>
                  <p className="text-sm text-slate-500">Total</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <CalendarCheck className="text-emerald-600" size={19} />
                  <p className="mt-3 text-2xl font-semibold">7</p>
                  <p className="text-sm text-slate-500">Completed</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <Clock3 className="text-amber-600" size={19} />
                  <p className="mt-3 text-2xl font-semibold">3</p>
                  <p className="text-sm text-slate-500">Pending</p>
                </div>
              </div>

              <div className="space-y-3">
                {previewTasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950">{task.title}</p>
                      <p className="text-sm text-slate-500">{task.meta}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${task.tone}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
