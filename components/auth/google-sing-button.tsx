"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button"; // usamos tu mismo Button de shadcn/ui

// 1) Tipado para el SDK de Google en window
declare global {
  interface Window {
    google?: any;
  }
}

// 2) Cargamos el script de Google Identity Services (GIS) una sola vez
const loadGoogleScriptOnce = () =>
  new Promise<void>((resolve, reject) => {
    const id = "google-identity-services";
    if (document.getElementById(id)) return resolve();

    const script = document.createElement("script");
    script.id = id;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("No se pudo cargar Google Identity Services"));
    document.head.appendChild(script);
  });

type GoogleCustomSignInProps = {
  // onCode: callback donde te entrego el "authorization code"
  // NOTA: Aquí NO enviamos nada al backend. Solo te pasamos el code para que
  // luego (en tu LoginForm) decidas cómo y dónde enviarlo.
  onCode?: (code: string) => void;
  // Deshabilitar desde fuera si tu UI lo requiere
  disabled?: boolean;
  // Permitir ajustar clases externas si quieres
  className?: string;
};

export function GoogleCustomSignIn({
  onCode,
  disabled,
  className,
}: GoogleCustomSignInProps) {
  // 3) Guardamos la instancia del "code client" de GIS
  const codeClientRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        // 4) Cargar el SDK
        await loadGoogleScriptOnce();
        if (cancelled) return;
        if (!window.google) throw new Error("Google SDK no disponible");

        // 5) Inicializar el Code Flow (OAuth 2.0 con PKCE manejado por GIS)
        //    - ux_mode: 'popup' -> se abre popup al hacer requestCode()
        //    - scope: pedimos "email profile" para obtener datos básicos
        //    - callback: Google nos devuelve { code } tras autenticarse
        codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
          scope: "email profile",
          ux_mode: "popup",
          callback: (response: { code?: string; error?: string }) => {
            if (response?.code && onCode) {
              // 6) Entregamos el authorization code al padre (LoginForm)
              onCode(response.code);
            }
            // NOTA IMPORTANTE:
            // Aquí NO llamamos a tu backend. Solo devolvemos el "code".
            // En tu LoginForm, con ese "code", luego harás un POST a tu API para canjearlo.
          },
        });

        setLoading(false);
      } catch (e) {
        console.error(e);
        setError("No se pudo inicializar Google");
        setLoading(false);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [onCode]);

  // 7) Al hacer click en TU botón, disparamos el popup de Google
  const handleClick = () => {
    if (!codeClientRef.current) return;
    codeClientRef.current.requestCode();
  };

  return (
    <div className={className}>
      {/* Tu botón personalizado (idéntico a como ya lo tenías) */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 font-medium"
        onClick={handleClick}
        disabled={disabled || loading}
      >
        {/* El mismo ícono SVG de Google que ya usabas */}
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continuar con Google
      </Button>

      {/* Estados de UX */}
      {loading && (
        <div className="mt-2 text-sm text-muted-foreground text-center">
          Cargando Google...
        </div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500 text-center">{error}</div>
      )}
    </div>
  );
}
