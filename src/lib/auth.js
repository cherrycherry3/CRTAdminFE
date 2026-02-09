const API_URL = "http://127.0.0.1:8000/api/auth/login";

export async function loginApi({ email, password, role }) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role, // "ADMIN"
    }),
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}
