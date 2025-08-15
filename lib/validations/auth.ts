import { z } from "zod";

// Esquema para Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

// Esquema para Registro
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "El nombre es requerido" })
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z
      .string()
      .min(1, { message: "El email es requerido" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(1, { message: "La contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirma tu contraseña" }),
    terms: z
      .boolean()
      .refine((val) => val === true, {
        message: "Debes aceptar los términos y condiciones",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema para Recuperar Contraseña
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Email inválido" }),
});

// Esquema para Restablecer Contraseña
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "La contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Tipos TypeScript inferidos de los esquemas
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
