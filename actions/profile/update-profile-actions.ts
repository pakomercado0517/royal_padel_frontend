"use server";

import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { editProfileSchema } from "@/lib/validations/auth";
import { getToken } from "@/lib/getToken";
import { revalidatePath } from "next/cache";

type ActionStateType = {
  errors: string[];
  success: string;
};

export const updateProfileAction = async (
  prevState: ActionStateType,
  formData: FormData
) => {
  const userData = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    avatarUrl: formData.get("avatarUrl"),
  };

  const user = editProfileSchema.safeParse(userData);

  if (!user.success) {
    return {
      errors: user.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();

  const url = `${process.env.API_URL}/user`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullName: user.data.fullName,
      phone: user.data.phone,
      email: user.data.email,
      avatarUrl: user.data.avatarUrl === "" ? null : user.data.avatarUrl,
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
