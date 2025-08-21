import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { ProfileInfo } from "@/components/profile/profile-info";
import { ProfileEditor } from "@/components/profile/profile-editor";
import { AccountSettings } from "@/components/profile/account-settings";
import { getUserData } from "@/actions/auth/user-data-actions";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Mi Perfil - Royal Padel",
  description: "Gestiona tu perfil y configuración de cuenta en Royal Padel.",
};

export default async function ProfilePage() {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS PAGE:
  ====================================
  
  1. 👤 GET USER PROFILE DATA:
     - Method: GET
     - Endpoint: /api/user/profile
     - Headers: { Authorization: "Bearer {token}" }
     - Response: {
         user: {
           id, fullName, email, phone, role, status,
           emailVerified, phoneVerified, avatarUrl,
           createdAt, updatedAt, lastLogin,
           stats: { totalGamesPlayed, totalHoursPlayed, ... }
         }
       }
  
  2. 📊 GET USER DETAILED STATS:
     - Method: GET  
     - Endpoint: /api/user/stats
     - Headers: { Authorization: "Bearer {token}" }
     - Response: {
         stats: {
           totalGamesPlayed, totalHoursPlayed, currentMonthGames,
           favoriteCourtId, totalSpent, averageRating,
           lastGameDate, streakDays, achievements, preferencesData
         }
       }
  
  💡 IMPLEMENTATION NOTES:
  - Redirect to login if user not authenticated
  - Show loading skeleton while fetching data
  - Handle API errors gracefully with toast notifications
  - Cache user data to avoid unnecessary API calls
  */

  // Obtener datos del usuario
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

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight">
              Mi Perfil
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu información personal y configuración de cuenta.
            </p>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="edit">Editar</TabsTrigger>
              <TabsTrigger value="settings">Configuración</TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="profile" className="space-y-6">
              <ProfileInfo user={user} />
            </TabsContent>

            {/* Edit Profile Tab */}
            <TabsContent value="edit" className="space-y-6">
              <ProfileEditor user={user} />
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <AccountSettings user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
