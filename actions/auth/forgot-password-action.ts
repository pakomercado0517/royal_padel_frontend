"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { forgotPasswordSchema } from "@/lib/validations/auth";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const forgotPassword = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const emailData = {
    email: formData.get("email"),
  };

  const emailToSend = forgotPasswordSchema.safeParse(emailData);

  if (!emailToSend.success) {
    return {
      errors: emailToSend.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const url = `${process.env.API_URL}/user/forgot_password`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailToSend.data.email,
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
