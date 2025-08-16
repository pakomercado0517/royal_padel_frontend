"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-display font-bold text-white">
              Royal<span className="text-lime-500">Padel</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#matches" className="text-white/90 hover:text-white font-medium transition-colors">
              Reservar Cancha
            </a>
            <a href="#partners" className="text-white/90 hover:text-white font-medium transition-colors">
              Encuentra Compañeros
            </a>
            <a href="#courts" className="text-white/90 hover:text-white font-medium transition-colors">
              Nuestras Instalaciones
            </a>
            <a href="#community" className="text-white/90 hover:text-white font-medium transition-colors">
              Comunidad
            </a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-full px-6">
                Registrarse Gratis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="#matches" className="text-white/90 hover:text-white font-medium">
                Reservar Cancha
              </a>
              <a href="#partners" className="text-white/90 hover:text-white font-medium">
                Encuentra Compañeros
              </a>
              <a href="#courts" className="text-white/90 hover:text-white font-medium">
                Nuestras Instalaciones
              </a>
              <a href="#community" className="text-white/90 hover:text-white font-medium">
                Comunidad
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 justify-start w-full">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-full">
                    Registrarse Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
