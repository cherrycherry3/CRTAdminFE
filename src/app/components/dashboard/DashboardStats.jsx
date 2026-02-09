"use client";

import { useDashboard } from "@/app/providers/DashboardProvider";

export default function DashboardStats() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data?.overview) return null;

  const { overview } = data;

  return (
    <div className="grid grid-cols-4 gap-6">
      <Stat title="Total Colleges" value={overview.total_colleges} />
      <Stat title="Total Students" value={overview.total_students} />
      <Stat title="Avg Completion" value={`${overview.avg_completion}%`} />
      <Stat title="Avg Score" value={overview.avg_score.toFixed(2)} />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
