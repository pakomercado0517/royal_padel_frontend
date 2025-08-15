"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { forgotPasswordSchema, type ForgotPasswordForm } from "@/lib/validations/auth";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordForm) {
    setIsLoading(true);
    
    try {
      // TODO: Integrar con API de autenticación
      console.log("Forgot password data:", data);
      
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Error al enviar email de recuperación:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-lime-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold">¡Email enviado!</h3>
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
              form.reset();
            }}
          >
            Intentar de nuevo
          </Button>
        </div>

        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-lime-600 hover:text-lime-500 font-semibold">
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
          Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      className="pl-10 h-12 bg-background"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-lime-500 hover:bg-lime-600 text-black font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando enlace...
              </>
            ) : (
              "Enviar enlace de recuperación"
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm space-y-2">
        <div>
          <span className="text-muted-foreground">¿Recordaste tu contraseña? </span>
          <Link href="/auth/login" className="text-lime-600 hover:text-lime-500 font-semibold">
            Inicia sesión aquí
          </Link>
        </div>
        <div>
          <span className="text-muted-foreground">¿No tienes una cuenta? </span>
          <Link href="/auth/register" className="text-lime-600 hover:text-lime-500 font-semibold">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
