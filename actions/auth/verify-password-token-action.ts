"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { TokenSchema } from "@/lib/validations/auth";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const verifyTokenPassword = async (
  token: string,
  prevState: ActionStateType
) => {
  const resetPasswordToken = TokenSchema.safeParse(token);

  if (!resetPasswordToken.success) {
    return {
      errors: resetPasswordToken.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/user/validate_token`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });

  const json = await req.json();

  if (!req.ok) {
    const { error } = ErrorResponseSchema.parse(json);
    return {
      errors: [error],
      success: "",
    };
  }

  const success = SuccessResponseSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
};
