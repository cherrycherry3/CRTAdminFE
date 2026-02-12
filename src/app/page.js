"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers/AuthProvider";
import { DashboardProvider } from "./providers/DashboardProvider";

import DashboardStats from "./components/dashboard/DashboardStats";
import CollegeRankings from "./components/dashboard/CollegeRankings";
import CourseAdoption from "./components/dashboard/CourseAdoption";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

 useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    router.push("/login");
  }
}, [router]);


  if (loading) return null;

  return (
    <DashboardProvider>
      <main className="p-8 space-y-8">
        <DashboardStats />
        <CollegeRankings />
        <CourseAdoption />
      </main>
    </DashboardProvider>
  );
}
