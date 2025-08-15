import { AuthLayout } from "@/components/auth/auth-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
  title: "Crear Cuenta - Royal Padel",
  description: "Únete a Royal Padel y comienza a disfrutar del mejor padel. Reserva canchas y conecta con jugadores.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Únete a la comunidad de padel más vibrante"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
