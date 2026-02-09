"use client";

import { useDashboard } from "@/app/providers/DashboardProvider";

export default function CourseAdoption() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data?.course_adoption) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold">Course Adoption</h2>

      <div className="space-y-3">
        {data.course_adoption.map((course, idx) => (
          <div
            key={idx}
            className="flex justify-between"
          >
            <span>{course.course}</span>
            <span>{course.adoption_percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
