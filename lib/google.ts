"use server";

import { cookies } from "next/headers";

// lib/auth/google.ts
// EXPLICACIÓN: Helper reutilizable para canjear el "authorization code" con tu API
export async function exchangeGoogleCode(code: string): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/googleAuth`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }
  );
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message || "Error al iniciar sesión con Google");
  }

  const json = await res.json();

  (await cookies()).set({
    name: "ROYALPADEL_TOKEN",
    value: json.token,
    path: "/",
  });

  return json.message;
}
