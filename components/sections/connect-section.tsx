"use client";

export function ConnectSection() {
  return (
    <section className="relative bg-slate-900 text-white py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Large Text */}
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-tight">
          <span className="block">Juega.</span>
          <span className="block">Conecta.</span>
          <span className="block bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
            Domina.
          </span>
        </h2>
        
        {/* Subtitle */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold mb-4 sm:mb-6">
            Una Plataforma Increíble 
            <br />
            Te Espera Aquí.
          </h3>
          <p className="text-lg sm:text-xl text-white/80 font-accent leading-relaxed">
            Únete a la comunidad de padel más vibrante. Encuentra tu nivel, 
            mejora tu juego y haz conexiones que durarán toda la vida.
          </p>
        </div>
      </div>
    </section>
  );
}
