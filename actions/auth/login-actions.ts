"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { loginSchema } from "@/lib/validations/auth";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const loginUser = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const login = loginSchema.safeParse(loginData);

  if (!login.success) {
    const errors = login.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/user/login`;

  //*Hacer login al server
  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: login.data.email,
      password: login.data.password,
    }),
  });

  //* Obtener respuesta del server
  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  //*Setear cookie con la respuesta del server si es ok
  (await cookies()).set({
    name: "ROYALPADEL_TOKEN",
    value: json.token,
    path: "/",
  });

  const success = SuccessResponseSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
};
