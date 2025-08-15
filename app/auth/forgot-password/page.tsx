import { AuthLayout } from "@/components/auth/auth-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata = {
  title: "Recuperar Contraseña - Royal Padel",
  description: "Recupera el acceso a tu cuenta de Royal Padel. Te enviaremos un enlace para restablecer tu contraseña.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="¿Olvidaste tu contraseña?"
      subtitle="No te preocupes, te ayudamos a recuperarla"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
