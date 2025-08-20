"use client";

import { Calendar, Trophy, Clock } from "lucide-react";
import { User as AuthUser } from "@/lib/validations/auth";

export function WelcomeSection({ user }: { user?: AuthUser }) {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 🎯 GET USER PROFILE WITH STATS:
     - Endpoint: GET /api/user/profile
     - Headers: Authorization: Bearer {token}
     - Response: {
         user: {
           id, fullName, email, role, 
           emailVerified, phoneVerified
         }
       }
  
  2. 📊 GET USER STATS (if not included in profile):
     - This might need a separate endpoint like GET /api/user/stats
     - Or could be included in the profile response
     - Expected data: {
         totalGamesPlayed: number,
         totalHoursPlayed: number, 
         currentMonthGames: number,
         favoriteCourtId: string,
         favoriteCourtName: string
       }
  
  3. 🏟️ GET FAVORITE COURT NAME (if not included above):
     - Endpoint: GET /api/court/{favoriteCourtId}
     - Response: { id, name, ... }
  
  💡 IMPLEMENTATION NOTES:
  - Call these APIs when component mounts or when user logs in
  - Store user data in context/state for reuse across dashboard
  - Calculate totalHoursPlayed = totalGamesPlayed * 1.5 (if not provided by API)
  - Handle loading states during API calls
  - Show fallback values if stats not available yet
  */

  // Determinar saludo basado en la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  // Determinar mensaje motivacional
  const getMotivationalMessage = () => {
    const messages = [
      "¡Listo para tu próximo partido!",
      "Tu cancha te está esperando",
      "Es momento de brillar en la pista",
      "¡A conquistar la cancha!",
      "Tu próxima victoria está cerca",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-lime-500 via-lime-600 to-lime-700 p-8 text-black">
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 border-4 border-black rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 border-2 border-black rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-black rounded-full"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Saludo principal */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            {getGreeting()}, {user?.fullName.split(" ")[0]}! 👋
          </h1>
          <p className="text-lg md:text-xl opacity-90 font-medium">
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
            <div className="bg-black/20 rounded-full p-2">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {user?.stats.totalGamesPlayed}
              </div>
              <div className="text-sm opacity-90 font-medium">
                Partidos jugados
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
            <div className="bg-black/20 rounded-full p-2">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {user?.stats.currentMonthGames}
              </div>
              <div className="text-sm opacity-90 font-medium">Este mes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-black/10 backdrop-blur-sm rounded-xl p-4">
            <div className="bg-black/20 rounded-full p-2">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {(user?.stats.totalGamesPlayed ?? 0) * 1.5}h
              </div>
              <div className="text-sm opacity-90 font-medium">Tiempo total</div>
            </div>
          </div>
        </div>

        {/* Mensaje adicional */}
        <div className="mt-6 flex items-center gap-2 text-sm opacity-90">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
          <span>Tu cancha favorita es la #{user?.stats.favoriteCourtId}</span>
        </div>
      </div>
    </div>
  );
}
