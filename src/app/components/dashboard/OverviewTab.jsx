export default function OverviewTab({ dashboard }) {
  const { overview, rankings, course_adoption } = dashboard;

  return (
    <div className="space-y-8">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Colleges" value={overview.total_colleges} />
        <StatCard title="Total Students" value={overview.total_students} />
        <StatCard
          title="Avg Completion"
          value={`${overview.avg_completion}%`}
        />
        <StatCard title="Avg Score" value={overview.avg_score} />
      </div>

      {/* COLLEGE RANKINGS */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">College Rankings</h2>

        {rankings.map((r) => (
          <div
            key={r.rank}
            className="flex items-center justify-between py-2"
          >
            <span>{r.college}</span>
            <span className="font-semibold">{r.points}</span>
          </div>
        ))}
      </div>

      {/* COURSE ADOPTION */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">Course Adoption</h2>

        {course_adoption.map((c) => (
          <div
            key={c.course}
            className="flex items-center justify-between py-2"
          >
            <span>{c.course}</span>
            <span className="font-semibold">
              {c.adoption_percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
