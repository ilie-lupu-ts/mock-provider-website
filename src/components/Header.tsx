import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";

import { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { PAGE_SIZE } from "@/data/billing-config";

export default function Header() {
  const baseUrl = import.meta.env.BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();

  return (
    <>
      <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <img
              src={`${baseUrl}tanstack-word-logo-white.svg`}
              alt="TanStack Logo"
              className="h-10"
            />
          </Link>
        </h1>
        <div className="ml-auto">
          {auth.isAuthenticated && (
            <button
              type="button"
              onClick={() => {
                auth.logout();
                navigate({ to: "/login" });
              }}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
            }}
          >
            <Home size={20} />
            <span className="font-medium">Home</span>
          </Link>

          {/* Demo Links Start */}
          {auth.isAuthenticated ? (
            <Link
              to="/bills"
              search={{
                page: 1,
                pageSize: PAGE_SIZE,
              }}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
              }}
            >
              <span className="font-medium">Bills</span>
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
              }}
            >
              <span className="font-medium">Login</span>
            </Link>
          )}

          {/* Demo Links End */}
        </nav>

        <div className="p-4 border-t border-gray-700 bg-gray-800 flex flex-col gap-2">
          {auth.isAuthenticated && (
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <span>{auth.userEmail}</span>
              <button
                type="button"
                onClick={() => {
                  auth.logout();
                  navigate({ to: "/login" });
                }}
                className="text-left text-red-300 hover:text-red-200 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
