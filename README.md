# 🎾 Royal Padel

> **Descubre tu partido perfecto** - La plataforma definitiva para reservar canchas de padel, conectar con jugadores y vivir la mejor experiencia deportiva.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-latest-000000?style=for-the-badge)

---

## ✨ Características Principales

### 🏆 **Hero Section Moderno**
- Diseño inspirado en plataformas deportivas premium
- Imagen de fondo profesional de padel
- Tipografía llamativa con Google Fonts
- Sección de estadísticas con avatares de jugadores

### 📱 **Navegación Intuitiva**
- Navbar transparente con efecto blur
- Menú responsive completamente funcional
- Botones de acción destacados
- Diseño mobile-first

### 🎨 **Diseño Impactante**
- Gradientes modernos y colores vibrantes
- Secciones tipográficas de gran impacto
- Animaciones sutiles y transiciones suaves
- Totalmente responsive (mobile, tablet, desktop)

---

## 🚀 Tecnologías

### **Frontend Stack**
- **[Next.js 15](https://nextjs.org/)** - React framework con Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety y mejor DX
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first styling
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes modernos y accesibles

### **Dependencias Clave**
- **[React Hook Form](https://react-hook-form.com/)** - Manejo eficiente de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Modo claro/oscuro
- **[Lucide React](https://lucide.dev/)** - Iconos modernos y consistentes
- **[Google Fonts](https://fonts.google.com/)** - Tipografía premium (Poppins, Montserrat, Inter)

---

## 💻 Instalación y Desarrollo

### **Requisitos Previos**
- Node.js 18+ 
- npm o pnpm

### **Configuración**

```bash
# Clonar el repositorio
git clone <repository-url>
cd royal-padel/frontend/royal-padel

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Scripts Disponibles**

```bash
npm run dev      # Desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

---

## 🎨 Estructura del Proyecto

```
royal-padel/
├── app/
│   ├── auth/                    # Rutas de autenticación
│   │   ├── login/page.tsx       # Página de inicio de sesión
│   │   ├── register/page.tsx    # Página de registro
│   │   └── forgot-password/page.tsx # Página recuperar contraseña
│   ├── layout.tsx          # Layout principal con fuentes y tema
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales y tema
├── components/
│   ├── auth/               # Componentes de autenticación
│   │   ├── auth-layout.tsx      # Layout base para formularios
│   │   ├── login-form.tsx       # Formulario de login
│   │   ├── register-form.tsx    # Formulario de registro
│   │   └── forgot-password-form.tsx # Formulario recuperar contraseña
│   ├── layout/
│   │   └── navbar.tsx      # Navegación principal
│   ├── providers/
│   │   └── theme-provider.tsx   # Provider para modo claro/oscuro
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero principal
│   │   └── connect-section.tsx  # Sección tipográfica
│   └── ui/                 # Componentes Shadcn/ui
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── theme-toggle.tsx
│       └── ... (otros componentes UI)
└── lib/
    ├── validations/
    │   └── auth.ts         # Esquemas de validación Zod
    └── utils.ts            # Utilidades y helpers
```

---

## 🎯 Funcionalidades Implementadas

### ✅ **Completado**
- [x] Hero section con imagen de fondo profesional
- [x] Navegación responsive con menú móvil
- [x] Sección de estadísticas con avatares
- [x] Tipografía impactante estilo "Juega. Conecta. Domina."
- [x] **Sistema de autenticación completo**
  - [x] Formularios de Login, Registro y Recuperar contraseña
  - [x] Validación robusta con Zod y React Hook Form
  - [x] Rutas organizadas bajo `/auth/*`
- [x] **Modo claro/oscuro** con next-themes
- [x] Configuración de Google Fonts premium
- [x] Componentes Shadcn/ui integrados
- [x] Diseño mobile-first completamente responsive

### 🚧 **En Desarrollo**
- [ ] Integración con API de autenticación (backend)
- [ ] Sistema de reservas de canchas
- [ ] Perfil de usuarios y dashboard
- [ ] Búsqueda de compañeros de juego
- [ ] Sistema de pagos
- [ ] Notificaciones en tiempo real

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Verde Lima | `#84cc16` | Botones principales, acentos |
| Slate 900 | `#0f172a` | Fondos oscuros, texto |
| Azul Gradiente | `#2563eb → #7c3aed` | Títulos principales |
| Blanco | `#ffffff` | Texto sobre fondos oscuros |

---

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### **Características Responsive**
- Tipografía escalable (4xl → 8xl)
- Navegación adaptativa
- Imágenes optimizadas
- Espaciado proporcional

---

## 🚀 Próximos Pasos

1. **Integración con API Backend** - Conectar formularios con endpoints de Node.js
2. **Sistema de Reservas** - Calendario interactivo y gestión de disponibilidad
3. **Dashboard de Usuario** - Panel de control con reservas y perfil
4. **Búsqueda Avanzada** - Filtros por ubicación, nivel y disponibilidad
5. **Sistema de Pagos** - Integración con Stripe o similar
6. **Notificaciones Push** - Confirmaciones y recordatorios

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para la comunidad de padel.

**¿Preguntas o sugerencias?** Abre un issue en GitHub.

---

<div align="center">
  <strong>🎾 Royal Padel - Donde cada partido cuenta</strong>
</div>
