export default function CollegesTab({ total }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-lg font-semibold mb-2">Colleges</h2>
      <p>Total Registered Colleges: <b>{total}</b></p>
    </div>
  );
}
