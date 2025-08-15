import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Iniciar Sesión - Royal Padel",
  description: "Inicia sesión en Royal Padel y accede a tu cuenta para reservar canchas y conectar con otros jugadores.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bienvenido de vuelta"
      subtitle="Inicia sesión en tu cuenta para continuar"
    >
      <LoginForm />
    </AuthLayout>
  );
}
