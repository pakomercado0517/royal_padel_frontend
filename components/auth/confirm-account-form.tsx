"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail, Shield, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyToken } from "@/actions/auth/verify-token-action";
import { toast } from "sonner";

interface VerifyTokenFormProps {
  email?: string;
}

export function ConfirmAccountForm({
  email = "usuario@ejemplo.com",
}: VerifyTokenFormProps) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isResending, setIsResending] = useState(false);
  const verifyTokenBinded = verifyToken.bind(null, token);
  const [state, dispatch, isPending] = useActionState(verifyTokenBinded, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach((error) => toast.error(error));
    }

    if (state.success) {
      toast.success(state.success);
      router.push("/auth/login");
    }
  }, [state, router]);

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      // TODO: Aquí iría la lógica para reenviar el código
      console.log("Reenviando código a:", email);

      // Simular llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Limpiar el input después de reenviar
      setToken("");
    } catch (error) {
      console.error("Error al reenviar código:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-lime-600" />
          </div>
        </div>

        <h1 className="text-2xl font-display font-semibold">
          Verificar tu identidad
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Hemos enviado un código de 6 dígitos a{" "}
          <span className="font-medium text-foreground">{email}</span>. Ingresa
          el código para continuar.
        </p>
      </div>

      {/* Form */}
      <form action={dispatch} className="space-y-6">
        {/* OTP Input */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={token}
              onChange={(token) => setToken(token)}
              disabled={isPending}
            >
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
            </InputOTP>
          </div>

          {/* Helper text */}
          <p className="text-center text-sm text-muted-foreground">
            {token.length}/6 dígitos ingresados
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
          disabled={isPending || token.length !== 6}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verificando código...
            </>
          ) : (
            "Verificar código"
          )}
        </Button>
      </form>

      {/* Resend Section */}
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
              onClick={handleResendCode}
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
                  Reenviar código
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
              <Link href="/auth/forgot-password">Cambiar email</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          asChild
          className="text-lime-600 hover:text-lime-500 font-medium"
        >
          <Link href="/auth/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </Button>
      </div>
    </div>
  );
}
