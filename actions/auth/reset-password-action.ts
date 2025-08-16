"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { resetPasswordSchema } from "@/lib/validations/auth";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const resetPassword = async (
  token: string,
  prevState: ActionStateType,
  formdata: FormData
) => {
  const passwordData = {
    password: formdata.get("password"),
    confirmPassword: formdata.get("confirmPassword"),
  };

  const resetPassword = resetPasswordSchema.safeParse(passwordData);

  if (!resetPassword.success) {
    return {
      errors: resetPassword.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/user/reset_password/${token}`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: resetPassword.data.password,
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
