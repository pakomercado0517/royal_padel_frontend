"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Mail,
  Shield,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle,
  Key,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyTokenPassword } from "@/actions/auth/verify-password-token-action";
import { toast } from "sonner";
import { resetPassword } from "@/actions/auth/reset-password-action";

interface ResetPasswordFormProps {
  email?: string;
}

export function ResetPasswordForm({
  email = "usuario@ejemplo.com",
}: ResetPasswordFormProps) {
  //Enrutador
  const router = useRouter();
  // Estados generales
  const [currentStep, setCurrentStep] = useState<"verify" | "reset">("verify");

  // Estados para verificación de token
  const [token, setToken] = useState("");
  const [isResending, setIsResending] = useState(false);

  // Estados para cambio de contraseña
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verificar token

  const verifyTokenPasswordBinded = verifyTokenPassword.bind(null, token);
  const [verifyState, verifyDispatch, isVerifying] = useActionState(
    verifyTokenPasswordBinded,
    {
      errors: [],
      success: "",
    }
  );

  const resetPasswordBinded = resetPassword.bind(null, token);
  const [resetState, resetDispatch, isResetting] = useActionState(
    resetPasswordBinded,
    {
      errors: [],
      success: "",
    }
  );

  useEffect(() => {
    if (verifyState.success) {
      toast.success(verifyState.success);
      setCurrentStep("reset");
    }

    if (verifyState.errors) {
      verifyState.errors.forEach((error) => toast.error(error));
    }
  }, [verifyState]);

  useEffect(() => {
    if (resetState.success) {
      toast.success(resetState.success);
      router.push("/auth/login");
    }

    if (resetState.errors) {
      resetState.errors.forEach((error) => toast.error(error));
    }
  }, [resetState, router]);

  // Reenviar código
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

  // Validaciones para el paso de contraseña
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  const isResetFormValid =
    isPasswordValid && doPasswordsMatch && password && confirmPassword;

  // Renderizar paso de verificación de token
  if (currentStep === "verify") {
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
            <span className="font-medium text-foreground">{email}</span>.
            Ingresa el código para continuar.
          </p>
        </div>

        {/* Form */}
        <form action={verifyDispatch} className="space-y-6">
          {/* OTP Input */}
          <div className="space-y-2">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={token}
                onChange={(value) => setToken(value)}
                disabled={isVerifying}
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
            disabled={isVerifying || token.length !== 6}
          >
            {isVerifying ? (
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

  // Renderizar paso de cambio de contraseña
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center">
            <Key className="w-8 h-8 text-lime-600" />
          </div>
        </div>

        <h1 className="text-2xl font-display font-semibold">
          Crear nueva contraseña
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Tu identidad ha sido verificada. Ahora puedes crear una nueva
          contraseña para tu cuenta.
        </p>
      </div>

      {/* Form */}
      <form action={resetDispatch} className="space-y-4">
        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Nueva contraseña
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="pr-10 h-12 bg-background"
              disabled={isResetting}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              disabled={isResetting}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {password && (
            <p
              className={`text-xs ${
                isPasswordValid ? "text-green-600" : "text-red-500"
              }`}
            >
              {isPasswordValid ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Contraseña válida
                </span>
              ) : (
                "La contraseña debe tener al menos 6 caracteres"
              )}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar contraseña
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu nueva contraseña"
              className="pr-10 h-12 bg-background"
              disabled={isResetting}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
              disabled={isResetting}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {confirmPassword && (
            <p
              className={`text-xs ${
                doPasswordsMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {doPasswordsMatch ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Las contraseñas coinciden
                </span>
              ) : (
                "Las contraseñas no coinciden"
              )}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
          disabled={isResetting || !isResetFormValid}
        >
          {isResetting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cambiando contraseña...
            </>
          ) : (
            "Cambiar contraseña"
          )}
        </Button>
      </form>

      {/* Back to verify */}
      <div className="text-center pt-4 border-t">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setCurrentStep("verify")}
          className="text-lime-600 hover:text-lime-500 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a verificar código
        </Button>
      </div>
    </div>
  );
}
