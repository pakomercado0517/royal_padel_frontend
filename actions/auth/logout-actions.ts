"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  try {
    //Limpiar la cooke al cerrar la sesión
    (await cookies()).delete("ROYALPADEL_TOKEN");

    return {
      success: true,
      data: { message: "Sesión cerrada exitosamente, vuelve pronto 🥺" },
    };
  } catch (error) {
    return {
      success: false,
      error: "Error al cerrar la sesión",
    };
  }
};
