import { AuthLayout } from "@/components/auth/auth-layout";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Restablecer Contraseña - Royal Padel",
  description:
    "Verifica tu identidad y crea una nueva contraseña para tu cuenta de Royal Padel.",
};

interface ResetPasswordPageProps {
  searchParams: {
    email?: string;
    token?: string;
  };
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const email = await searchParams.email;

  return (
    <AuthLayout
      title="Restablecer contraseña"
      subtitle="Verifica tu identidad y crea una nueva contraseña"
    >
      <ResetPasswordForm email={email} />
    </AuthLayout>
  );
}
