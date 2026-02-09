"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "@/lib/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("role");

    if (storedToken) {
      setToken(storedToken);
      setUser({ email: storedEmail, role: storedRole });
    }

    setLoading(false);
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    const data = await loginApi({
      email,
      password,
      role: "ADMIN",
    });

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("role", data.role);

    setToken(data.access_token);
    setUser({ email, role: data.role });

    router.push("/");
  };

  // LOGOUT
  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useAuth = () => useContext(AuthContext);
