import { apiFetch } from "./api";

export function fetchAdminDashboard() {
  return apiFetch(
    "http://127.0.0.1:8000/api/admin/admin/dashboard"
  );
}
