"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/navbar";

export function HeroSection() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" 
         style={{
           backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`
         }}>
      
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Content */}
      <div className="flex flex-col justify-center min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-tight mb-6">
              <span className="block">Descubre tu</span>
              <span className="block">partido perfecto.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-accent leading-relaxed mb-8 max-w-xl">
              Tu plataforma definitiva de padel para conectar, jugar 
              partidos, encontrar compañeros y explorar canchas locales.
            </p>
            
            {/* CTA Button */}
            <Button 
              size="lg"
              className="bg-lime-500 hover:bg-lime-600 text-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
            >
              Explora las canchas
            </Button>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="container mx-auto px-4 mt-12 sm:mt-16">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Avatar Group */}
            <div className="flex -space-x-2 sm:-space-x-3">
              <Avatar className="border-2 border-white w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-10 h-10 sm:w-12 sm:h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
            </div>
            
            {/* Stats Text */}
            <div className="text-white">
              <p className="text-base sm:text-lg font-semibold">Más de 1,000 Jugadores</p>
              <p className="text-white/80 text-sm">de Padel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
