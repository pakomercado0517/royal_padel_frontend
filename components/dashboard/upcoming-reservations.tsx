"use client";

import { Calendar, Clock, MapPin, MoreVertical, Eye, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Reservation {
  id: string;
  courtName: string;
  courtId: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
  players?: string[];
}

export function UpcomingReservations() {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 📅 GET USER'S UPCOMING RESERVATIONS:
     - Endpoint: GET /api/reservation?dateFrom={today}&status=confirmed,pending
     - Headers: Authorization: Bearer {token}
     - Query params: 
       * dateFrom: today's date (YYYY-MM-DD)
       * status: "confirmed,pending" (comma separated)
       * pageSize: 3 (limit to first 3 upcoming)
     - Response: {
         reservations: [{
           id, reservationDate, startTime, endTime,
           durationMinutes, totalPrice, status, specialRequests,
           court: { id, name },
           user: { id, fullName },
           payment: { id, amount, status }
         }],
         pagination: { total, page, pageSize, ... }
       }
  
  2. ❌ CANCEL RESERVATION:
     - Endpoint: POST /api/reservation/{id}/cancel
     - Body: { cancellationReason: string }
     - Response: { message }
  
  3. 🔍 VIEW RESERVATION DETAILS:
     - Endpoint: GET /api/reservation/{id}
     - Response: { full reservation details with court and payment info }
  
  💡 IMPLEMENTATION NOTES:
  - Load reservations on component mount
  - Filter for reservations with future dates only
  - Show loading state while fetching
  - Handle empty state when no upcoming reservations
  - Calculate missing players (4 - current players count)
  - Format dates as "Hoy", "Mañana" or "Lun 15 Ene"
  - Refresh data after cancellation
  - Show confirmation modal before canceling
  */
  
  // Mock data - TODO: Replace with API call above
  const reservations: Reservation[] = [
    {
      id: "1",
      courtName: "Cancha 3",
      courtId: "3",
      date: "2024-01-20",
      time: "18:00",
      duration: 90,
      price: 45,
      status: "confirmed",
      players: ["Francisco M.", "Carlos R.", "Ana G.", "Luis P."]
    },
    {
      id: "2",
      courtName: "Cancha 1",
      courtId: "1",
      date: "2024-01-22",
      time: "10:30",
      duration: 60,
      price: 25,
      status: "confirmed",
      players: ["Francisco M.", "María L."]
    },
    {
      id: "3",
      courtName: "Cancha 4",
      courtId: "4",
      date: "2024-01-25",
      time: "16:00",
      duration: 90,
      price: 45,
      status: "pending",
      players: ["Francisco M."]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-100 dark:bg-green-900";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
      case "cancelled":
        return "text-red-600 bg-red-100 dark:bg-red-900";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana";
    } else {
      return date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  const handleViewDetails = (reservationId: string) => {
    // TODO: Navegar a detalles de la reservación
    console.log("Ver detalles:", reservationId);
  };

  const handleCancelReservation = (reservationId: string) => {
    // TODO: Mostrar modal de confirmación y cancelar reserva
    console.log("Cancelar reserva:", reservationId);
  };

  if (reservations.length === 0) {
    return (
      <div className="bg-card rounded-2xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-lime-100 dark:bg-lime-900 rounded-full p-2">
            <Calendar className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">Mis Próximas Reservas</h2>
            <p className="text-sm text-muted-foreground">
              Tus reservaciones confirmadas y pendientes
            </p>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No tienes reservas próximas</h3>
          <p className="text-muted-foreground mb-4">
            ¡Es el momento perfecto para reservar tu próximo partido!
          </p>
          <Button className="bg-lime-500 hover:bg-lime-600 text-black">
            Hacer una reserva
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-lime-100 dark:bg-lime-900 rounded-full p-2">
            <Calendar className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">Mis Próximas Reservas</h2>
            <p className="text-sm text-muted-foreground">
              {reservations.length} reservación{reservations.length !== 1 ? 'es' : ''} próxima{reservations.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="text-lime-600 hover:text-lime-700">
          Ver todas
        </Button>
      </div>

      {/* Lista de reservaciones */}
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="border rounded-xl p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Información principal */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-lime-600" />
                    <span className="font-semibold">{reservation.courtName}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                    {getStatusText(reservation.status)}
                  </span>
                </div>

                {/* Fecha y hora */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(reservation.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{reservation.time} ({reservation.duration}min)</span>
                  </div>
                </div>

                {/* Jugadores */}
                {reservation.players && reservation.players.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {reservation.players.length === 1 
                        ? "Solo" 
                        : `${reservation.players.length} jugadores`
                      }
                    </span>
                    {reservation.players.length < 4 && (
                      <span className="text-yellow-600 font-medium">
                        • Faltan {4 - reservation.players.length} jugador{4 - reservation.players.length !== 1 ? 'es' : ''}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Precio y acciones */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-lg">${reservation.price}</div>
                  <div className="text-xs text-muted-foreground">
                    ${(reservation.price / (reservation.duration / 60)).toFixed(0)}/h
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(reservation.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </DropdownMenuItem>
                    {reservation.status !== "cancelled" && (
                      <DropdownMenuItem 
                        onClick={() => handleCancelReservation(reservation.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancelar
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          💡 Puedes cancelar sin costo hasta 2 horas antes del partido
        </p>
      </div>
    </div>
  );
}
