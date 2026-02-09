"use client";

import { useDashboard } from "@/app/providers/DashboardProvider";

export default function CollegeRankings() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Loading rankings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data?.rankings) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold">College Rankings</h2>

      <div className="space-y-3">
        {data.rankings.map((item) => (
          <div
            key={item.rank}
            className="flex justify-between"
          >
            <span>{item.college}</span>
            <span>{item.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
