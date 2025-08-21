-- =====================================================================
-- SOLUCIÓN TEMPORAL: DESHABILITAR RLS PARA DESARROLLO
-- =====================================================================
-- 
-- ⚠️  ADVERTENCIA: Solo usar en desarrollo, NO en producción
-- Esta consulta deshabilita Row Level Security para el storage
--

-- Crear el bucket 'avatars' si no existe (como público)
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Deshabilitar RLS para storage.objects (SOLO DESARROLLO)
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- =====================================================================
-- PARA RE-HABILITAR RLS DESPUÉS:
-- =====================================================================
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
--
-- Luego necesitarás agregar las políticas del archivo anterior
-- =====================================================================
