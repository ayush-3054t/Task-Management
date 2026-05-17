import { LogOut, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ onCreate }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-950">Task Management</h1>
          <p className="text-sm text-slate-500">Signed in as {user?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">New Task</span>
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
