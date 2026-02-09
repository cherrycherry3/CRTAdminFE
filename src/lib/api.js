export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No auth token found");
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API ${response.status}: ${text}`);
    }

    return await response.json();
  } catch (err) {
    console.error("apiFetch error:", err);
    throw err;
  }
}
