export default function LeaderboardsTab({ rankings }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold">
        College Rankings
      </h2>

      {rankings.map((r) => (
        <div
          key={r.rank}
          className="flex justify-between border-b py-3"
        >
          <span>
            #{r.rank} {r.college}
          </span>
          <span className="font-semibold">{r.points}</span>
        </div>
      ))}
    </div>
  );
}
