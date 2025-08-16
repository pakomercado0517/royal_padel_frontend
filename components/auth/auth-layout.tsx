"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-2xl rotate-12"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white rounded-xl -rotate-12"></div>
          <div className="absolute bottom-40 left-16 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-white rounded-xl -rotate-45"></div>
        </div>
        
        <div className="flex flex-col justify-center items-center text-white p-12 relative z-10">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-display font-bold mb-6">
              Royal<span className="text-lime-400">Padel</span>
            </h1>
            <p className="text-xl text-white/90 font-accent leading-relaxed mb-8">
              Únete a la comunidad de padel más vibrante. Conecta, juega y domina.
            </p>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">1</span>
                </div>
                <span>Reserva tu cancha favorita</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">2</span>
                </div>
                <span>Encuentra compañeros de juego</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">3</span>
                </div>
                <span>Mejora tu nivel y disfruta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto w-full max-w-md">
          {/* Back button */}
          {showBackButton && (
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="p-0 h-auto font-medium text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al inicio
                </Button>
              </Link>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-center lg:hidden mb-6">
              <h1 className="text-3xl font-display font-bold">
                Royal<span className="text-lime-500">Padel</span>
              </h1>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground font-accent">
              {subtitle}
            </p>
          </div>

          {/* Form content */}
          <div className="space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
