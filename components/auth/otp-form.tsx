"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, Shield, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface OTPFormProps {
  // Configuración del formulario
  title?: string;
  description?: string;
  email?: string;
  maxLength?: number;
  
  // Funciones de callback
  onSubmit?: (token: string) => Promise<void> | void;
  onResend?: () => Promise<void> | void;
  
  // Estados externos (opcional)
  isLoading?: boolean;
  isResending?: boolean;
  
  // Textos personalizables
  submitButtonText?: string;
  loadingText?: string;
  resendButtonText?: string;
  
  // Enlaces de navegación
  backLink?: {
    href: string;
    text: string;
  };
  changeEmailLink?: {
    href: string;
    text: string;
  };
  
  // Configuración de diseño
  icon?: React.ReactNode;
  showResendSection?: boolean;
  showBackLink?: boolean;
}

export function OTPForm({
  title = "Verificar tu identidad",
  description,
  email = "usuario@ejemplo.com",
  maxLength = 6,
  onSubmit,
  onResend,
  isLoading: externalIsLoading,
  isResending: externalIsResending,
  submitButtonText = "Verificar código",
  loadingText = "Verificando código...",
  resendButtonText = "Reenviar código",
  backLink = {
    href: "/auth/login",
    text: "Volver al inicio de sesión"
  },
  changeEmailLink = {
    href: "/auth/forgot-password",
    text: "Cambiar email"
  },
  icon = <Shield className="w-8 h-8 text-lime-600" />,
  showResendSection = true,
  showBackLink = true,
}: OTPFormProps) {
  // Estados internos
  const [token, setToken] = useState("");
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const [internalIsResending, setInternalIsResending] = useState(false);
  
  // Usar estados externos si están disponibles, sino usar internos
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading;
  const isResending = externalIsResending !== undefined ? externalIsResending : internalIsResending;

  // Descripción por defecto
  const defaultDescription = `Hemos enviado un código de ${maxLength} dígitos a ${email}. Ingresa el código para continuar.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (token.length !== maxLength) {
      return;
    }

    if (onSubmit) {
      if (externalIsLoading === undefined) {
        setInternalIsLoading(true);
      }
      
      try {
        await onSubmit(token);
      } catch (error) {
        console.error("Error en OTP submit:", error);
      } finally {
        if (externalIsLoading === undefined) {
          setInternalIsLoading(false);
        }
      }
    }
  };

  const handleResend = async () => {
    if (onResend) {
      if (externalIsResending === undefined) {
        setInternalIsResending(true);
      }
      
      try {
        await onResend();
        // Limpiar el input después de reenviar
        setToken("");
      } catch (error) {
        console.error("Error en resend:", error);
      } finally {
        if (externalIsResending === undefined) {
          setInternalIsResending(false);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        <h1 className="text-2xl font-display font-semibold">{title}</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {description || defaultDescription}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <InputOTP
              maxLength={maxLength}
              value={token}
              onChange={(value) => setToken(value)}
              disabled={isLoading}
            >
              {/* Generar slots dinámicamente */}
              {maxLength === 6 ? (
                <>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </>
              ) : (
                <InputOTPGroup>
                  {Array.from({ length: maxLength }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            </InputOTP>
          </div>
          
          {/* Helper text */}
          <p className="text-center text-sm text-muted-foreground">
            {token.length}/{maxLength} dígitos ingresados
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
          disabled={isLoading || token.length !== maxLength}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingText}
            </>
          ) : (
            submitButtonText
          )}
        </Button>
      </form>

      {/* Resend Section */}
      {showResendSection && (
        <div className="space-y-4 pt-4 border-t">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              ¿No recibiste el código?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-3 w-3" />
                    {resendButtonText}
                  </>
                )}
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                asChild
                className="text-sm"
              >
                <Link href={changeEmailLink.href}>
                  {changeEmailLink.text}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Back Link */}
      {showBackLink && (
        <div className="text-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            asChild
            className="text-lime-600 hover:text-lime-500 font-medium"
          >
            <Link href={backLink.href}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {backLink.text}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
