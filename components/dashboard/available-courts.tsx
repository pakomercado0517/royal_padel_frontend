"use client";

import { useState } from "react";
import { MapPin, Clock, Users, DollarSign, CheckCircle, XCircle, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Court {
  id: string;
  name: string;
  status: "available" | "occupied" | "maintenance";
  currentPrice: number;
  nextAvailable?: string;
  occupiedUntil?: string;
  features: string[];
  capacity: number;
  lastReserved?: string;
}

export function AvailableCourts() {
  const [refreshing, setRefreshing] = useState(false);
  
  // Mock data - TODO: Obtener desde API en tiempo real
  const courts: Court[] = [
    {
      id: "1",
      name: "Cancha 1",
      status: "available",
      currentPrice: 25,
      features: ["Iluminación LED", "Césped Sintético"],
      capacity: 4,
      lastReserved: "hace 2 horas"
    },
    {
      id: "2",
      name: "Cancha 2",
      status: "occupied",
      currentPrice: 25,
      occupiedUntil: "19:30",
      nextAvailable: "19:30",
      features: ["Iluminación LED", "Césped Sintético"],
      capacity: 4
    },
    {
      id: "3",
      name: "Cancha 3",
      status: "available",
      currentPrice: 30,
      features: ["Iluminación LED", "Césped Premium", "Climatizada"],
      capacity: 4,
      lastReserved: "hace 30 min"
    },
    {
      id: "4",
      name: "Cancha 4",
      status: "maintenance",
      currentPrice: 30,
      nextAvailable: "Mañana 08:00",
      features: ["Iluminación LED", "Césped Premium", "Climatizada"],
      capacity: 4
    }
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "available":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: "Disponible",
          color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
          dotColor: "bg-green-500"
        };
      case "occupied":
        return {
          icon: <Users className="w-4 h-4" />,
          text: "Ocupada",
          color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
          dotColor: "bg-red-500"
        };
      case "maintenance":
        return {
          icon: <XCircle className="w-4 h-4" />,
          text: "Mantenimiento",
          color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
          dotColor: "bg-yellow-500"
        };
      default:
        return {
          icon: <Timer className="w-4 h-4" />,
          text: "Desconocido",
          color: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
          dotColor: "bg-gray-500"
        };
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // TODO: Actualizar datos desde API
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleReserveCourt = (courtId: string) => {
    // TODO: Navegar a página de reserva con cancha preseleccionada
    console.log("Reservar cancha:", courtId);
  };

  const availableCourts = courts.filter(court => court.status === "available");
  const occupiedCourts = courts.filter(court => court.status === "occupied");

  return (
    <div className="bg-card rounded-2xl border p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-lime-100 dark:bg-lime-900 rounded-full p-2">
            <MapPin className="w-5 h-5 text-lime-600" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold">Estado de Canchas</h2>
            <p className="text-sm text-muted-foreground">
              {availableCourts.length} de {courts.length} disponibles ahora
            </p>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-lime-600 hover:text-lime-700"
        >
          <Timer className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Actualizando...' : 'Actualizar'}
        </Button>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-green-600">{availableCourts.length}</div>
          <div className="text-xs text-green-700 dark:text-green-300">Disponibles</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-red-600">{occupiedCourts.length}</div>
          <div className="text-xs text-red-700 dark:text-red-300">Ocupadas</div>
        </div>
        <div className="bg-lime-50 dark:bg-lime-900/20 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-lime-600">
            ${Math.min(...courts.map(c => c.currentPrice))}
          </div>
          <div className="text-xs text-lime-700 dark:text-lime-300">Desde/hora</div>
        </div>
      </div>

      {/* Lista de canchas */}
      <div className="space-y-3">
        {courts.map((court) => {
          const statusConfig = getStatusConfig(court.status);
          
          return (
            <div
              key={court.id}
              className="border rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Nombre y estado */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor} animate-pulse`}></div>
                      <span className="font-semibold">{court.name}</span>
                    </div>
                    <Badge variant="secondary" className={statusConfig.color}>
                      {statusConfig.icon}
                      <span className="ml-1">{statusConfig.text}</span>
                    </Badge>
                  </div>

                  {/* Información adicional */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${court.currentPrice}/hora</span>
                    </div>
                    {court.status === "occupied" && court.occupiedUntil && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Libre a las {court.occupiedUntil}</span>
                      </div>
                    )}
                    {court.status === "available" && court.lastReserved && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Libre desde {court.lastReserved}</span>
                      </div>
                    )}
                  </div>

                  {/* Características */}
                  <div className="flex flex-wrap gap-1">
                    {court.features.slice(0, 2).map((feature, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                    {court.features.length > 2 && (
                      <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                        +{court.features.length - 2} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="flex flex-col items-end gap-2">
                  {court.status === "available" ? (
                    <Button
                      size="sm"
                      onClick={() => handleReserveCourt(court.id)}
                      className="bg-lime-500 hover:bg-lime-600 text-black font-medium"
                    >
                      Reservar
                    </Button>
                  ) : (
                    <div className="text-right">
                      {court.nextAvailable && (
                        <>
                          <div className="text-xs text-muted-foreground">
                            Disponible:
                          </div>
                          <div className="text-sm font-medium">
                            {court.nextAvailable}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer informativo */}
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>🔄 Actualización automática cada 30 segundos</span>
          <span>💡 Los precios pueden variar según la hora</span>
        </div>
      </div>
    </div>
  );
}
