"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuickReservation() {
  /* 
  ====================================
  🔗 API CALLS NEEDED FOR THIS COMPONENT:
  ====================================
  
  1. 🏟️ GET AVAILABLE COURTS:
     - Endpoint: GET /api/court?status=active
     - Headers: Authorization: Bearer {token}
     - Response: {
         courts: [{
           id, name, basePricePerHour, features, status,
           capacity, description, images
         }]
       }
  
  2. ⏰ GET AVAILABLE TIME SLOTS:
     - Endpoint: GET /api/reservation/availability/{courtId}?date={selectedDate}
     - This should return available time slots for selected court and date
     - Response: {
         available: boolean,
         timeSlots: ["08:00", "09:30", "11:00", ...]
       }
  
  3. 💰 CALCULATE PRICE FOR RESERVATION:
     - Endpoint: POST /api/court-pricing/calculate
     - Body: { courtId, date, startTime, endTime }
     - Response: {
         success: true,
         data: {
           totalPrice: 171.00,
           pricePerHour: 85.50,
           duration: 2.0,
           breakdown: [{ timeSlot, pricePerHour, subtotal }]
         }
       }
  
  4. 📅 CREATE RESERVATION:
     - Endpoint: POST /api/reservation
     - Body: {
         courtId, reservationDate, startTime, endTime,
         totalPrice, bookingType: "individual"
       }
     - Response: { message, reservation: {...} }
  
  💡 IMPLEMENTATION NOTES:
  - Load courts list on component mount
  - Update available times when court or date changes
  - Calculate price when court, date, and time are selected
  - Show price breakdown in UI before confirming reservation
  - Handle loading states for each API call
  - Validate time slots before allowing selection
  */
  
  const [selectedDate, setSelectedDate] = useState<string>("today");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedCourt, setSelectedCourt] = useState<string>("");

  // Mock data - TODO: Replace with API calls above
  const availableTimes = [
    "08:00", "09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"
  ];

  const availableCourts = [
    { id: "1", name: "Cancha 1", price: "25" },
    { id: "2", name: "Cancha 2", price: "25" },
    { id: "3", name: "Cancha 3", price: "30" },
    { id: "4", name: "Cancha 4", price: "30" },
  ];

  const getDateOptions = () => {
    const today = new Date();
    const options = [
      { value: "today", label: "Hoy", date: today },
      { 
        value: "tomorrow", 
        label: "Mañana", 
        date: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    ];
    
    // Agregar próximos 5 días
    for (let i = 2; i <= 6; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      options.push({
        value: `day-${i}`,
        label: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
        date
      });
    }
    
    return options;
  };

  const handleQuickReservation = () => {
    if (!selectedTime || !selectedCourt) {
      // TODO: Mostrar toast de error
      console.log("Selecciona hora y cancha");
      return;
    }

    // TODO: Navegar a página de confirmación o procesar reserva
    console.log("Procesando reserva:", {
      date: selectedDate,
      time: selectedTime,
      court: selectedCourt
    });
  };

  return (
    <div className="bg-card rounded-2xl border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-lime-100 dark:bg-lime-900 rounded-full p-2">
          <Zap className="w-5 h-5 text-lime-600" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold">Reserva Rápida</h2>
          <p className="text-sm text-muted-foreground">
            Encuentra tu cancha ideal en segundos
          </p>
        </div>
      </div>

      {/* Formulario de reserva rápida */}
      <div className="space-y-4">
        {/* Selector de fecha */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="w-4 h-4 text-lime-600" />
            Fecha
          </label>
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecciona una fecha" />
            </SelectTrigger>
            <SelectContent>
              {getDateOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {option.date.toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selector de hora */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4 text-lime-600" />
            Hora
          </label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecciona una hora" />
            </SelectTrigger>
            <SelectContent>
              {availableTimes.map((time) => (
                <SelectItem key={time} value={time}>
                  <div className="flex items-center justify-between w-full">
                    <span>{time}</span>
                    <span className="text-xs text-green-600 ml-2">Disponible</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Selector de cancha */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-lime-600" />
            Cancha
          </label>
          <Select value={selectedCourt} onValueChange={setSelectedCourt}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecciona una cancha" />
            </SelectTrigger>
            <SelectContent>
              {availableCourts.map((court) => (
                <SelectItem key={court.id} value={court.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{court.name}</span>
                    <span className="text-xs font-semibold text-lime-600 ml-2">
                      ${court.price}/h
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botón de acción */}
      <Button 
        onClick={handleQuickReservation}
        className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
        disabled={!selectedTime || !selectedCourt}
      >
        <span className="flex items-center gap-2">
          Reservar Ahora
          <ArrowRight className="w-4 h-4" />
        </span>
      </Button>

      {/* Mensaje informativo */}
      <div className="bg-muted/50 rounded-lg p-3">
        <p className="text-xs text-muted-foreground text-center">
          ⚡ Reserva instantánea • Confirmación inmediata • Sin costo adicional
        </p>
      </div>
    </div>
  );
}
