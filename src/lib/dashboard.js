import { apiFetch } from "./api";

export function fetchAdminDashboard() {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  return apiFetch(
    `${API_URL}/api/admin/admin/dashboard`
  );
}
