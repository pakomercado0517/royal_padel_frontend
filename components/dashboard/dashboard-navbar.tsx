"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Calendar,
  CreditCard,
  HelpCircle,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { logout } from "@/actions/auth/logout-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { User as AuthUser } from "@/lib/validations/auth";

export function DashboardNavbar({ user }: { user?: AuthUser }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { setTheme } = useTheme();

  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 🚪 LOGOUT USER:
     - Endpoint: POST /api/auth/logout
     - Headers: Authorization: Bearer {token}
     - Body: { refreshToken?: string } (if using refresh tokens)
     - Response: { message: "Logged out successfully" }
  
  2. 🔔 GET NOTIFICATIONS COUNT:
     - Endpoint: GET /api/user/notifications?unreadOnly=true
     - Response: { total: number, notifications: [...] }
  
  3. 👤 UPDATE USER PREFERENCES:
     - Endpoint: PATCH /api/user/profile
     - Body: { theme: "light" | "dark" | "system", ... }
     - Response: { user: {...} }
  
  💡 IMPLEMENTATION NOTES:
  - Clear auth tokens from localStorage/cookies on logout
  - Redirect to login page after successful logout
  - Show loading state during logout process
  - Handle logout errors gracefully
  - Update notification count in real-time
  - Persist theme preference
  */

  const mockUser = user || {
    id: "1",
    fullName: "Francisco Mercado",
    email: "francisco@royalpadel.com",
    avatarUrl: "",
  };

  // Mock notification count - TODO: Replace with API call
  const notificationCount = 3;

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      toast.warning(result.data?.message);
      redirect("/auth/login");
    } else {
      toast.error(result.error);
    }
  };

  const handleNotificationClick = () => {
    // TODO: Navigate to notifications page or open notifications panel
    console.log("Ver notificaciones");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Calendar },
    { href: "/reservations", label: "Mis Reservas", icon: Calendar },
    { href: "/payments", label: "Pagos", icon: CreditCard },
  ];

  const UserMenuContent = () => (
    <>
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">
            {mockUser.fullName}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {mockUser.email}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <Link href="/profile" className="flex items-center">
          <User className="mr-2 h-4 w-4" />
          <span>Mi Perfil</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href="/settings" className="flex items-center">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Sun className="mr-2 h-4 w-4" />
          <span>Tema</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Claro</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Oscuro</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor className="mr-2 h-4 w-4" />
            <span>Sistema</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <DropdownMenuItem asChild>
        <Link href="/help" className="flex items-center">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Ayuda</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={handleLogout}
        className="text-red-600 focus:text-red-600 dark:text-red-400"
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Cerrar Sesión</span>
      </DropdownMenuItem>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <h1 className="text-xl font-display font-bold text-foreground">
              Royal<span className="text-lime-500">Padel</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Badge>
              )}
            </Button>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={mockUser.avatarUrl}
                        alt={mockUser.fullName}
                      />
                      <AvatarFallback className="bg-lime-500 text-black font-semibold">
                        {mockUser.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <UserMenuContent />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isSheetOpen ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Menu className="h-4 w-4" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle className="text-left">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={mockUser.avatarUrl}
                            alt={mockUser.fullName}
                          />
                          <AvatarFallback className="bg-lime-500 text-black font-semibold">
                            {mockUser.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {mockUser.fullName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {mockUser.email}
                          </span>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 space-y-2">
                    {/* Mobile Navigation Items */}
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSheetOpen(false)}
                        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    <div className="my-4 border-t" />

                    {/* Mobile User Actions */}
                    <Link
                      href="/profile"
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <User className="h-4 w-4" />
                      <span>Mi Perfil</span>
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>

                    <Link
                      href="/help"
                      onClick={() => setIsSheetOpen(false)}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span>Ayuda</span>
                    </Link>

                    <div className="my-4 border-t" />

                    <Button
                      onClick={() => {
                        setIsSheetOpen(false);
                        handleLogout();
                      }}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
