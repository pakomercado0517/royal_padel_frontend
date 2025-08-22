"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { exchangeGoogleCode } from "@/lib/google";
import { loginUser } from "@/actions/auth/login-actions";
import { GoogleCustomSignIn } from "./google-sing-button";

export function LoginForm() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, dispatch, isPending] = useActionState(loginUser, {
    errors: [],
    success: "",
  });

  const handleGoogleCode = async (code: string) => {
    try {
      setGoogleLoading(true);
      const response = await exchangeGoogleCode(code); // <-- handler separado
      toast.success(response);
      await router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error con Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
      router.push("/dashboard");
    }

    if (state.errors && state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state, router]);

  return (
    <div className="space-y-6">
      <form action={dispatch} className="space-y-4">
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

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-lime-600 hover:text-lime-500 font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Tu contraseña"
              className="pr-10 h-12 bg-background"
              disabled={isPending}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              disabled={isPending}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
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
              Iniciando sesión...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            o continúa con
          </span>
        </div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <GoogleCustomSignIn
          onCode={handleGoogleCode}
          disabled={googleLoading}
          className="w-full"
        />
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">¿No tienes una cuenta? </span>
        <Link
          href="/auth/register"
          className="text-lime-600 hover:text-lime-500 font-semibold"
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
