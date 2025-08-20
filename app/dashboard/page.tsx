import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { QuickReservation } from "@/components/dashboard/quick-reservation";
import { UpcomingReservations } from "@/components/dashboard/upcoming-reservations";
import { AvailableCourts } from "@/components/dashboard/available-courts";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { getUserData } from "@/actions/auth/user-data-actions";
import { redirect } from "next/navigation";
import { User } from "@/lib/validations/auth";

export const metadata = {
  title: "Dashboard - Royal Padel",
  description: "Tu centro de control para reservas y partidos de pádel.",
};

export default async function DashboardPage() {
  // TODO: Obtener datos reales del usuario y reservaciones
  const userResult = await getUserData();

  // Manejo de errores (usuario no autenticado, etc.)
  if (!userResult.success || !userResult.data) {
    redirect("/auth/login");
  }

  const user = userResult.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Navbar */}
      <DashboardNavbar user={user} />

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Sección de Bienvenida */}
          <WelcomeSection user={user} />

          {/* Grid principal para desktop, stack para mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-8">
              <QuickReservation />
              <UpcomingReservations />
            </div>

            {/* Columna derecha */}
            <div className="space-y-8">
              <AvailableCourts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
