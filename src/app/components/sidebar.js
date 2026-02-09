"use client";

import { useAuth } from "../providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItem = (label, path) => (
    <div
      onClick={() => router.push(path)}
      className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition
        ${
          pathname === path
            ? "bg-white/10 font-semibold"
            : "text-gray-300 hover:bg-white/5"
        }`}
    >
      {label}
    </div>
  );

  return (
    <aside className="flex h-screen w-64 flex-col justify-between bg-gradient-to-b from-[#0b1530] to-[#0a1025] p-6 text-white">
      {/* TOP */}
      <div>
        <h2 className="text-lg font-bold">CRT Platform</h2>
        <p className="text-xs text-gray-300">Application Admin</p>

        <nav className="mt-8 space-y-2">
          {navItem("Dashboard", "/")}
          {navItem("Colleges", "/colleges")}
          {navItem("Course Sets", "/course")}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-xs text-gray-300">Logged in as</p>
        <p className="truncate text-sm">{user?.email}</p>

        <button
          onClick={logout}
          className="mt-3 w-full rounded-lg bg-red-500 py-2 text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
