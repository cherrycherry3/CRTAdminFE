"use client";

import { useEffect, useState } from "react";
import OverviewTab from "./OverviewTab";
import LeaderboardsTab from "./LeaderboardsTab";
import CourseAnalyticsTab from "./CourseAnalyticsTab";
import CollegesTab from "./CollegesTab";

export default function DashboardTabs() {
  const API_URL =process.env.NEXT_PUBLIC_API_BASE_URL;
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      const token = localStorage.getItem("access_token");

      const res = await fetch(API_URL,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setDashboard(data);
    }

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <p className="mt-6 text-gray-500">Loading dashboard...</p>;
  }

  return (
    <div className="mt-6">
      {/* TAB HEADER */}
      <div className="inline-flex rounded-xl bg-gray-100 p-1">
        {[
          { id: "overview", label: "Overview" },
          { id: "leaderboards", label: "Leaderboards" },
          { id: "analytics", label: "Course Analytics" },
          { id: "colleges", label: "Colleges" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-white text-blue-600 shadow"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT (THIS IS WHAT CHANGES) */}
      <div className="mt-8">
        {activeTab === "overview" && (
          <OverviewTab dashboard={dashboard} />
        )}

        {activeTab === "leaderboards" && (
          <LeaderboardsTab rankings={dashboard.rankings} />
        )}

        {activeTab === "analytics" && (
          <CourseAnalyticsTab courses={dashboard.course_adoption} />
        )}

        {activeTab === "colleges" && (
          <CollegesTab total={dashboard.overview.total_colleges} />
        )}
      </div>
    </div>
  );
}
