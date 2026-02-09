"use client";

import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";
import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          {isLoginPage ? (
            children
          ) : (
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-4">
                {children}
              </main>
            </div>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
