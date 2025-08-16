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

export const verifyToken = async (
  token: string,
  prevState: ActionStateType
) => {
  const tokenData = TokenSchema.safeParse(token);

  console.log("tokenData", tokenData);

  if (!tokenData.success) {
    const errors = tokenData.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  const url = `${process.env.API_URL}/user/confirm_account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: tokenData.data,
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
