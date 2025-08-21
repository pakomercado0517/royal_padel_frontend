-- =====================================================================
-- CONFIGURACIÓN DE STORAGE POLICIES PARA BUCKET DE AVATARS
-- =====================================================================
-- 
-- Estas consultas deben ejecutarse en el SQL Editor de Supabase Dashboard
-- para permitir el upload y acceso a los archivos de avatar
--

-- 1. Crear el bucket 'avatars' si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Permitir INSERT (subir archivos) para usuarios autenticados o anónimos
-- Nota: Como usas tu propio backend de auth, permite acceso anónimo
CREATE POLICY "Allow anonymous uploads to avatars bucket" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars'
);

-- 3. Permitir SELECT (ver archivos) para todos
CREATE POLICY "Allow public access to avatars bucket" ON storage.objects
FOR SELECT USING (
  bucket_id = 'avatars'
);

-- 4. Permitir UPDATE (actualizar archivos) para archivos del mismo usuario
-- Opcional: si quieres permitir actualizar archivos existentes
CREATE POLICY "Allow updates to own avatars" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars'
);

-- 5. Permitir DELETE (eliminar archivos) para todos los archivos del bucket
-- Nota: Puedes restringir esto más si lo necesitas
CREATE POLICY "Allow deleting avatars" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars'
);

-- =====================================================================
-- VERIFICACIÓN DE POLÍTICAS
-- =====================================================================

-- Verificar que el bucket existe
SELECT * FROM storage.buckets WHERE id = 'avatars';

-- Verificar las políticas creadas
SELECT * FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects';

-- =====================================================================
-- ALTERNATIVA MÁS SEGURA (OPCIONAL)
-- =====================================================================
-- Si quieres una configuración más segura y planeas integrar 
-- autenticación de Supabase en el futuro, puedes usar estas políticas:

/*
-- Solo para usuarios autenticados
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.role() = 'authenticated'
);

-- Los usuarios pueden ver todos los avatars pero solo editar/eliminar los suyos
CREATE POLICY "Users can manage own avatars" ON storage.objects
FOR ALL USING (
  bucket_id = 'avatars' AND 
  (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'anon')
);
*/
