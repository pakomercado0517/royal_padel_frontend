"use server";

import { getToken } from "@/lib/getToken";
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { changePasswordSchema } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";

type ActionStateTypes = {
  errors: string[];
  success: string;
};

export const changeCurrentPassword = async (
  prevState: ActionStateTypes,
  formData: FormData
) => {
  const passwordData = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  };

  const newPasswordFormData = changePasswordSchema.safeParse(passwordData);

  if (!newPasswordFormData.success) {
    return {
      errors: newPasswordFormData.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/user/update_password`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: newPasswordFormData.data.currentPassword,
      newPassword: newPasswordFormData.data.newPassword,
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

  revalidatePath("/profile");
  const success = SuccessResponseSchema.parse(json.message);

  return {
    errors: [],
    success,
  };
};
