"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "@/lib/validations/auth";
import {
  Mail,
  Phone,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Star,
  Activity,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ProfileInfoProps {
  user: User;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 📊 GET DETAILED USER STATISTICS:
     - Method: GET
     - Endpoint: /api/user/stats/detailed
     - Headers: { Authorization: "Bearer {token}" }
     - Response: {
         monthlyStats: { month: string, games: number, hours: number }[],
         achievements: { id, name, description, earnedAt, iconUrl }[],
         favoriteCourtDetails: { id, name, location, imageUrl },
         recentActivity: { date, type, description, courtName }[],
         rankings: { position: number, category: string, points: number }
       }
  
  2. 🏆 GET USER ACHIEVEMENTS:
     - Method: GET
     - Endpoint: /api/user/achievements
     - Headers: { Authorization: "Bearer {token}" }
     - Response: {
         earned: Achievement[],
         available: Achievement[],
         progress: { achievementId: string, currentValue: number, targetValue: number }[]
       }
  
  💡 IMPLEMENTATION NOTES:
  - Show skeleton loading states for stats
  - Format dates and numbers properly for display
  - Handle missing or null data gracefully
  - Add tooltips for achievement badges
  - Show verification badges for email/phone
  */

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Función para formatear la fecha de último juego
  const formatLastGameDate = (dateString: string) => {
    if (!dateString) return "Nunca";

    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy", { locale: es });
    } catch {
      return "Fecha inválida";
    }
  };

  // Mock data para mostrar - TODO: Replace with real API data
  const mockStats = {
    totalGamesPlayed: user.stats?.totalGamesPlayed || 0,
    totalHoursPlayed: user.stats?.totalHoursPlayed || "0",
    currentMonthGames: user.stats?.currentMonthGames || 0,
    totalSpent: user.stats?.totalSpent || "0",
    averageRating: user.stats?.averageRating || 0,
    lastGameDate: user.stats?.lastGameDate || "",
    streakDays: user.stats?.streakDays || 0,
  };

  const mockAchievements = [
    {
      name: "Primer Juego",
      description: "Jugaste tu primera partida",
      earned: true,
    },
    {
      name: "Jugador Frecuente",
      description: "10 partidas jugadas",
      earned: true,
    },
    {
      name: "Madrugador",
      description: "5 partidas antes de las 8 AM",
      earned: false,
    },
    {
      name: "Noctámbulo",
      description: "5 partidas después de las 10 PM",
      earned: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatarUrl || ""} alt={user.fullName} />
                <AvatarFallback className="text-lg font-semibold">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
                {user.status === "active" ? "Activo" : "Inactivo"}
              </Badge>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-muted-foreground capitalize">{user.role}</p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                  {user.emailVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                  {user.phoneVerified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Verificaciones:</span>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={user.emailVerified ? "default" : "destructive"}
                    className="text-xs"
                  >
                    Email {user.emailVerified ? "✓" : "✗"}
                  </Badge>
                  <Badge
                    variant={user.phoneVerified ? "default" : "destructive"}
                    className="text-xs"
                  >
                    Teléfono {user.phoneVerified ? "✓" : "✗"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lime-100 rounded-lg dark:bg-lime-900">
                <Activity className="h-5 w-5 text-lime-600 dark:text-lime-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.totalGamesPlayed}
                </p>
                <p className="text-xs text-muted-foreground">
                  Partidas Jugadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.totalHoursPlayed}h
                </p>
                <p className="text-xs text-muted-foreground">Horas de Juego</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.currentMonthGames}
                </p>
                <p className="text-xs text-muted-foreground">Este Mes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockStats.averageRating.toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Calificación</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Estadísticas de Juego
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Gasto Total:
              </span>
              <span className="font-semibold">${mockStats.totalSpent} MXN</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Último Juego:
              </span>
              <span className="font-semibold">
                {formatLastGameDate(mockStats.lastGameDate)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Racha Actual:
              </span>
              <Badge variant="outline">{mockStats.streakDays} días</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Logros Recientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAchievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                    achievement.earned
                      ? "bg-green-50 dark:bg-green-900/20"
                      : "bg-gray-50 dark:bg-gray-800/50"
                  }`}
                >
                  <Trophy
                    className={`h-4 w-4 ${
                      achievement.earned
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
