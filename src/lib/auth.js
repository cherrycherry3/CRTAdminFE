
export async function loginApi({ email, password, role }) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
