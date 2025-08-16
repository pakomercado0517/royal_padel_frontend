"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { forgotPassword } from "@/actions/auth/forgot-password-action";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const [state, dispatch, isPending] = useActionState(forgotPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      setIsSuccess(true);
      router.push("/auth/login");
    }

    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state, router]);

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-lime-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold">
            ¡Email enviado!
          </h3>
          <p className="text-muted-foreground">
            Te hemos enviado un enlace de recuperación a tu correo electrónico.
            Revisa tu bandeja de entrada y sigue las instrucciones.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            ¿No recibiste el email? Revisa tu carpeta de spam o
          </p>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => {
              setIsSuccess(false);
            }}
          >
            Intentar de nuevo
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link
            href="/auth/login"
            className="text-lime-600 hover:text-lime-500 font-semibold"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-6">
        <p className="text-muted-foreground">
          Ingresa tu email y te enviaremos un enlace para restablecer tu
          contraseña.
        </p>
      </div>

      <form action={dispatch} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              className="pl-10 h-12 bg-background"
              disabled={isPending}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando enlace...
            </>
          ) : (
            "Enviar enlace de recuperación"
          )}
        </Button>
      </form>

      <div className="text-center text-sm space-y-2">
        <div>
          <span className="text-muted-foreground">
            ¿Recordaste tu contraseña?{" "}
          </span>
          <Link
            href="/auth/login"
            className="text-lime-600 hover:text-lime-500 font-semibold"
          >
            Inicia sesión aquí
          </Link>
        </div>
        <div>
          <span className="text-muted-foreground">¿No tienes una cuenta? </span>
          <Link
            href="/auth/register"
            className="text-lime-600 hover:text-lime-500 font-semibold"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
