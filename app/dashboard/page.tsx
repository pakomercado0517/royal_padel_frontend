import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { QuickReservation } from "@/components/dashboard/quick-reservation";
import { UpcomingReservations } from "@/components/dashboard/upcoming-reservations";
import { AvailableCourts } from "@/components/dashboard/available-courts";

export const metadata = {
  title: "Dashboard - Royal Padel",
  description: "Tu centro de control para reservas y partidos de pádel.",
};

export default function DashboardPage() {
  // TODO: Obtener datos reales del usuario y reservaciones
  const mockUser = {
    id: "1",
    name: "Francisco Mercado",
    email: "francisco@example.com",
    totalGames: 24,
    monthlyGames: 8,
    favoriteCourtId: "3",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Sección de Bienvenida */}
          <WelcomeSection user={mockUser} />

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
