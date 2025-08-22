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

//Esquema de token de validación de cuenta
export const TokenSchema = z
  .string({ message: "Token inválido" })
  .length(6, { message: "Token inválido" });

export const UserStatsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  totalGamesPlayed: z.number(),
  totalHoursPlayed: z.string(),
  currentMonthGames: z.number(),
  favoriteCourtId: z.string(),
  totalSpent: z.string(),
  averageRating: z.number(),
  lastGameDate: z.string(),
  streakDays: z.number(),
  achievements: z.array(z.string()),
  preferencesData: z.array(z.string()),
});

//Esquema de datos de Usuario
export const UserSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  role: z.string(),
  phone: z.string(),
  status: z.string(),
  googleSub: z.string(),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  avatarUrl: z.string(),
  stats: UserStatsSchema,
});

// Esquema para Registro
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "El nombre es requerido" })
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z
      .string()
      .min(1, { message: "El email es requerido" })
      .email({ message: "Email inválido" }),
    phone: z
      .string()
      .min(10, {
        message:
          "El número telefonico es obligatorio con un mínimo de 10 dígitos",
      })
      .max(10, { message: "El teléfono es de un máximo de 10 dígitos" }),
    password: z
      .string()
      .min(1, { message: "La contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z.string().min(1, { message: "Confirma tu contraseña" }),
    terms: z.boolean().refine((val) => val === true, {
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
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z.string().min(1, { message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema para Edición del Perfil
export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "Email inválido" }),
  phone: z
    .string()
    .min(10, {
      message:
        "El número telefónico es obligatorio con un mínimo de 10 dígitos",
    })
    .max(10, { message: "El teléfono es de un máximo de 10 dígitos" }),
  avatarUrl: z
    .string()
    .url({ message: "URL de avatar inválida" })
    .optional()
    .or(z.literal("")),
});

export const avatarUrlSchema = z
  .string()
  .url({ message: "URL de avatar inválida" })
  .optional()
  .or(z.literal(""));

// Esquema para Cambio de Contraseña

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "La contraseña actual es requerida" }),
    newPassword: z
      .string()
      .min(1, { message: "La nueva contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Confirma tu nueva contraseña" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  });

// Esquema para Configuración de Notificaciones
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  reservationReminders: z.boolean().default(true),
  promotionalEmails: z.boolean().default(false),
  gameInvitations: z.boolean().default(true),
});

// Esquema para Configuración de Privacidad
export const privacySettingsSchema = z.object({
  profileVisibility: z
    .enum(["public", "friends", "private"])
    .default("friends"),
  showStats: z.boolean().default(true),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  allowGameInvitations: z.boolean().default(true),
});

// Tipos TypeScript inferidos de los esquemas
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type Token = z.infer<typeof TokenSchema>;
export type User = z.infer<typeof UserSchema>;
export type UserStats = z.infer<typeof UserStatsSchema>;
export type EditProfileForm = z.infer<typeof editProfileSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;
export type PrivacySettings = z.infer<typeof privacySettingsSchema>;
export type AvatarUrl = z.infer<typeof avatarUrlSchema>;
