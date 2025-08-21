import { AuthLayout } from "@/components/auth/auth-layout";
import { ConfirmAccountForm } from "@/components/auth/confirm-account-form";

export const metadata = {
  title: "Verificar Código - Royal Padel",
  description:
    "Ingresa el código de verificación enviado a tu email para restablecer tu contraseña.",
};

interface VerifyTokenPageProps {
  searchParams: {
    email?: string;
  };
}

export default async function VerifyTokenPage({
  searchParams,
}: VerifyTokenPageProps) {
  const { email } = await searchParams;

  return (
    <AuthLayout
      title="Verificación de seguridad"
      subtitle="Confirma tu identidad para continuar"
    >
      <ConfirmAccountForm email={email} />
    </AuthLayout>
  );
}
