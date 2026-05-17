import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { getErrorMessage } from "../services/api.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      await login(form);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-8 flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-white">
            <CheckSquare size={24} />
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Welcome back</h1>
            <p className="text-sm text-slate-500">Manage your work from one dashboard.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-slate-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 h-11 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-slate-500"
              placeholder="Your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full rounded-md bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          No account?{" "}
          <Link className="font-semibold text-slate-950 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
