"use client";

export default function CourseAnalyticsTab({ courses }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        Course Analytics
      </h2>

      {courses.map((c) => (
        <div
          key={c.course}
          className="flex justify-between border-b py-3"
        >
          <div>
            <p className="font-medium">{c.course}</p>
            <p className="text-sm text-gray-500">
              {c.adopted_by}
            </p>
          </div>
          <span className="font-semibold">
            {c.adoption_percent}%
          </span>
        </div>
      ))}
    </div>
  );
}
