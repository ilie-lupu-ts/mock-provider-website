import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { HARDCODED_EMAIL, HARDCODED_PASSWORD } from "@/lib/auth";
import { PAGE_SIZE } from "@/data/billing-config";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/bills",
        search: {
          page: 1,
          pageSize: PAGE_SIZE,
        },
      });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const { auth } = Route.useRouteContext();
  const navigate = Route.useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (
      email.trim().toLowerCase() === HARDCODED_EMAIL.toLowerCase() &&
      password === HARDCODED_PASSWORD
    ) {
      auth.login(email.trim());
      navigate({
        to: "/bills",
        search: {
          page: 1,
          pageSize: PAGE_SIZE,
        },
      });
      return;
    }

    setError("Invalid email or password. Please try again.");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
        <p className="text-sm text-gray-500 mt-2">
          Use the demo credentials to access your billing portal.
        </p>

        {/* <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-gray-600">
          <div>
            Email: <span className="font-medium">{HARDCODED_EMAIL}</span>
          </div>
          <div>
            Password: <span className="font-medium">{HARDCODED_PASSWORD}</span>
          </div>
        </div> */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-cyan-600 text-white py-2 font-medium hover:bg-cyan-700 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
