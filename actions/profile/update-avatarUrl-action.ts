"use server";

import { getToken } from "@/lib/getToken";
import {
  ErrorResponseSchema,
  SuccessResponseSchema,
} from "@/lib/validations/actions-response";
import { avatarUrlSchema } from "@/lib/validations/auth";
import { revalidatePath } from "next/cache";

type ActionStateTypes = {
  errors: string[];
  success: string;
};

export const updateAvatarUrl = async (
  prevState: ActionStateTypes,
  formData: FormData
) => {
  const avatarData = {
    avatarUrl: formData.get("avatarUrl"),
  };

  const avatar = avatarUrlSchema.safeParse(avatarData);

  if (!avatar.success) {
    return {
      errors: avatar.error.issues.map((issue) => issue.message),
      success: "",
    };
  }

  const token = await getToken();
  const url = `${process.env.API_URL}/user/update_avatarURL`;

  const req = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      avatarUrl: avatar.data,
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
