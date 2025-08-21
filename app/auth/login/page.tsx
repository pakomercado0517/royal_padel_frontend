import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";
import { LoginWithMessage } from "@/components/auth/login-with-message";

export const metadata = {
  title: "Iniciar Sesión - Royal Padel",
  description:
    "Inicia sesión en Royal Padel y accede a tu cuenta para reservar canchas y conectar con otros jugadores.",
};

interface LoginPageProps {
  searchParams: {
    message?: string;
    type?: "success" | "info" | "error";
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { message, type } = await searchParams;

  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Inicia sesión en tu cuenta para continuar"
    >
      <LoginWithMessage message={message} type={type} />
    </AuthLayout>
  );
}
