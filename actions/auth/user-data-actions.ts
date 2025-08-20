"use server";

import { ErrorResponseSchema } from "@/lib/validations/actions-response";
import { User, UserSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";

type ActionStateType<T> = {
  error: string;
  success: boolean;
  data?: T;
};

export const getUserData = async (): Promise<ActionStateType<User>> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("ROYALPADEL_TOKEN")?.value;

    if (!token) {
      return {
        error: "No se encontró el token de autenticación",
        success: false,
      };
    }

    const url = `${process.env.API_URL}/user/profile`;

    const req = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await req.json();

    if (!req.ok) {
      const { error } = ErrorResponseSchema.parse(json);
      return {
        error: error,
        success: false,
      };
    }

    const userProfile = UserSchema.safeParse(json.userProfile);

    return {
      success: true,
      data: userProfile.data,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      error: `Error de conexión: ${error}`,
    };
  }
};
