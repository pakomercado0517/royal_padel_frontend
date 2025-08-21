"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { LoginForm } from "./login-form";

interface LoginWithMessageProps {
  message?: string;
  type?: 'success' | 'info' | 'error';
}

export function LoginWithMessage({ message, type }: LoginWithMessageProps) {
  // useRef para rastrear si ya se mostró el toast
  // Se mantiene durante todo el ciclo de vida del componente
  // y NO causa re-renders cuando cambia
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Solo ejecutar si hay mensaje Y no se ha mostrado antes
    if (message && !hasShownToast.current) {
      // Marcar como mostrado ANTES de ejecutar el toast
      // Esto previene ejecuciones duplicadas en React Strict Mode
      hasShownToast.current = true;
      
      const decodedMessage = decodeURIComponent(message);
      
      switch (type) {
        case 'success':
          toast.success(decodedMessage);
          break;
        case 'info':
          toast.info(decodedMessage);
          break;
        case 'error':
          toast.error(decodedMessage);
          break;
        default:
          toast.info(decodedMessage);
      }

      // Limpiar la URL después de mostrar el toast
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.delete('message');
        url.searchParams.delete('type');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [message, type]);

  return <LoginForm />;
}
