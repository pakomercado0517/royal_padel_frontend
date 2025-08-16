"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { registerSchema } from "@/lib/validations/auth";

const { API_URL } = process.env;

type ActionStateType = {
  errors: string[];
  success: string;
};

export const register = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const registerData = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms") === "on",
  };

  console.log("registerData", registerData);
  //validar
  const register = registerSchema.safeParse(registerData);

  if (!register.success) {
    const errors = register.error.issues.map((issue) => issue.message);
    return {
      errors,
      success: "",
    };
  }

  //Registrar usuario
  const url = `${API_URL}/user/create_account`;

  const req = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: register.data.fullName,
      email: register.data.email,
      phone: register.data.phone,
      password: register.data.password,
    }),
  });

  const json = await req.json();

  if (req.status === 409) {
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
