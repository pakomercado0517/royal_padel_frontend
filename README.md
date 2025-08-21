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
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **[Next Themes](https://github.com/pacocoursey/next-themes)** - Modo claro/oscuro
- **[Lucide React](https://lucide.dev/)** - Iconos modernos y consistentes
- **[Google Fonts](https://fonts.google.com/)** - Tipografía premium (Poppins, Montserrat, Inter)
- **[Sonner](https://sonner.emilkowal.ski/)** - Sistema de notificaciones toast moderno
- **[Input OTP](https://input-otp.rodz.dev/)** - Componente de entrada OTP accesible
- **[Date-fns](https://date-fns.org/)** - Manipulación y formateo de fechas
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos de componentes accesibles
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service para almacenamiento de archivos

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
├── actions/
│   ├── auth/                    # Server Actions de autenticación
│   │   ├── create-account-action.ts
│   │   ├── login-actions.ts
│   │   ├── forgot-password-action.ts
│   │   ├── reset-password-action.ts
│   │   ├── verify-token-action.ts
│   │   └── user-data-actions.ts
│   └── profile/                 # Server Actions de perfil
│       ├── update-profile-actions.ts
│       └── change-current-password-action.ts
├── app/
│   ├── auth/                    # Rutas de autenticación
│   │   ├── login/page.tsx       # Página de inicio de sesión
│   │   ├── register/page.tsx    # Página de registro
│   │   ├── confirm-account/page.tsx # Confirmación de cuenta
│   │   ├── forgot-password/page.tsx # Recuperar contraseña
│   │   └── reset-password/page.tsx  # Restablecer contraseña
│   ├── dashboard/page.tsx       # Panel principal del usuario
│   ├── profile/page.tsx         # Perfil y configuración
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Estilos globales
├── components/
│   ├── auth/                    # Componentes de autenticación
│   │   ├── auth-layout.tsx      # Layout base para formularios
│   │   ├── login-form.tsx       # Formulario de login
│   │   ├── register-form.tsx    # Formulario de registro
│   │   ├── forgot-password-form.tsx
│   │   ├── reset-password-form.tsx
│   │   ├── confirm-account-form.tsx
│   │   ├── login-with-message.tsx # Login con mensajes toast
│   │   ├── otp-form.tsx         # Entrada de códigos OTP
│   │   └── verify-token-form.tsx # Verificación de token y reset
│   ├── dashboard/               # Componentes del dashboard
│   │   ├── dashboard-navbar.tsx # Navegación del dashboard
│   │   ├── welcome-section.tsx  # Sección de bienvenida
│   │   ├── quick-reservation.tsx # Reserva rápida
│   │   ├── upcoming-reservations.tsx # Próximas reservas
│   │   └── available-courts.tsx # Estado de canchas
│   ├── profile/                 # Componentes de perfil
│   │   ├── profile-info.tsx     # Información del perfil
│   │   ├── profile-editor.tsx   # Editor de perfil con upload de avatar
│   │   └── account-settings.tsx # Configuración de cuenta
│   ├── layout/
│   │   └── navbar.tsx           # Navegación principal
│   ├── providers/
│   │   └── theme-provider.tsx   # Provider para temas
│   ├── sections/
│   │   ├── hero-section.tsx     # Hero principal
│   │   └── connect-section.tsx  # Sección tipográfica
│   └── ui/                      # Componentes Shadcn/ui
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       ├── input-otp.tsx        # Componente OTP
│       ├── avatar.tsx           # Componente Avatar
│       ├── card.tsx             # Componente Card
│       ├── dialog.tsx           # Componente Dialog
│       ├── badge.tsx            # Componente Badge
│       ├── select.tsx           # Componente Select
│       ├── dropdown-menu.tsx    # Componente Dropdown
│       └── ... (otros componentes UI)
├── hooks/
│   └── useAvatarUpload.ts       # Hook para upload de avatares a Supabase
└── lib/
    ├── validations/
    │   ├── auth.ts              # Esquemas de validación auth
    │   └── profile.ts           # Esquemas de validación perfil
    ├── avatar-utils.ts          # Utilidades para avatares (initials, preview)
    └── utils.ts                 # Utilidades y helpers
```

---

## 🎯 Funcionalidades Implementadas

### ✅ **Completado**
- [x] **Landing Page Premium**
  - [x] Hero section con imagen de fondo profesional
  - [x] Navegación responsive con menú móvil
  - [x] Sección de estadísticas con avatares
  - [x] Tipografía impactante estilo "Juega. Conecta. Domina."
  - [x] Gradientes modernos y animaciones suaves

- [x] **Sistema de Autenticación Completo**
  - [x] Formularios con patrón `useActionState` y Server Actions
  - [x] Login, Registro, Confirmación de cuenta
  - [x] Recuperación y restablecimiento de contraseña
  - [x] Componente OTP reutilizable y accesible
  - [x] Validación robusta con Zod
  - [x] Sistema de notificaciones toast con Sonner
  - [x] Manejo de mensajes de error y éxito

- [x] **Dashboard Post-Login**
  - [x] Sección de bienvenida personalizada
  - [x] Módulo de reserva rápida
  - [x] Próximas reservaciones con datos reales
  - [x] Estado de canchas disponibles en tiempo real
  - [x] Navegación específica del dashboard
  - [x] Diseño minimalista y semi-elegante

- [x] **Sistema de Perfil de Usuario**
  - [x] Visualización de información personal con estadísticas
  - [x] Editor de perfil (nombre, email, teléfono)
  - [x] **Sistema de Avatar Completo**
    - [x] Upload de imágenes a Supabase Storage
    - [x] Preview inmediato de imágenes seleccionadas
    - [x] Validación de tipos y tamaños de archivo
    - [x] Gestión de estados de carga y errores
    - [x] Control pendiente con rollback automático
    - [x] Generación automática de iniciales como fallback
  - [x] Configuración de cuenta y cambio de contraseña
  - [x] Interfaz tabbed para organización
  - [x] Validaciones en tiempo real

- [x] **Infraestructura Técnica**
  - [x] Next.js 15 con Turbopack
  - [x] TypeScript strict mode
  - [x] Tailwind CSS v4 con tema personalizado
  - [x] Componentes Shadcn/ui completamente integrados
  - [x] Modo claro/oscuro con next-themes
  - [x] Google Fonts premium (Poppins, Montserrat, Inter)
  - [x] **Patrón useActionState** - Formularios sin React Hook Form
  - [x] Arquitectura de Server Actions organizada
  - [x] **Integración Supabase Storage** - Upload y gestión de archivos
  - [x] Hooks personalizados reutilizables
  - [x] Diseño mobile-first completamente responsive

### 🚧 **En Desarrollo**
- [ ] **Integración Backend**
  - [ ] API de autenticación real
  - [ ] Base de datos de usuarios
  - [ ] Sistema de sesiones seguro
  - [ ] Endpoints para estadísticas de perfil

- [ ] **Sistema de Reservas Avanzado**
  - [ ] Calendario interactivo
  - [ ] Gestión de disponibilidad en tiempo real
  - [ ] Reservas recurrentes

- [ ] **Funcionalidades Sociales**
  - [ ] Búsqueda de compañeros de juego
  - [ ] Sistema de mensajería
  - [ ] Perfiles públicos de jugadores

- [ ] **Sistema de Pagos**
  - [ ] Integración con Stripe
  - [ ] Gestión de membresías
  - [ ] Historial de pagos

- [ ] **Características Avanzadas**
  - [ ] Notificaciones push
  - [ ] Análiticas de juego
  - [ ] Sistema de reseñas y calificaciones
  - [ ] Búsqueda de usuarios y filtros avanzados

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

1. **Conectar Datos Reales** - Integrar estadísticas y datos de backend
2. **Sistema de Reservas** - Calendario interactivo y gestión de disponibilidad
3. **Búsqueda Avanzada** - Filtros por ubicación, nivel y disponibilidad
4. **Sistema de Pagos** - Integración con Stripe o similar
5. **Notificaciones Push** - Confirmaciones y recordatorios
6. **Optimizaciones de Performance** - Lazy loading y caching

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
