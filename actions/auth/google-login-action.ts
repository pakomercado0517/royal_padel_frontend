"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { cookies } from "next/headers";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const googleLogin = async (sub: string, prevState: ActionStateType) => {
  const url = `${process.env.API_URL}/user/googleAuth`;

  const code = sub;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  (await cookies()).set({
    name: "ROYALPADEL_TOKEN",
    value: json.token,
    path: "/",
  });

  const success = SuccessResponseSchema.parse(json.message);

  return {
    error: [],
    success,
  };
};
