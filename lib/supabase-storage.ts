import { createClient } from '@supabase/supabase-js'

// URLs y keys de Supabase - estas se configurarán en .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Cliente de Supabase configurado únicamente para Storage
 * No incluye autenticación ya que usamos nuestro propio backend
 */
export const supabaseStorage = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No persistir sesiones de auth
  },
})

/**
 * Configuración del bucket de avatares
 */
export const AVATAR_BUCKET = 'avatars'

/**
 * Tamaños máximos permitidos
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/webp'
]

/**
 * Generar nombre único para archivo
 */
export const generateFileName = (originalName: string, userId?: string): string => {
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 15)
  const fileExt = originalName.split('.').pop()?.toLowerCase()
  
  const fileName = `${timestamp}_${randomId}.${fileExt}`
  
  // Si hay userId, crear carpeta por usuario
  return userId ? `${userId}/${fileName}` : `general/${fileName}`
}

/**
 * Extraer path del archivo desde la URL pública de Supabase
 */
export const extractFilePathFromUrl = (publicUrl: string): string | null => {
  try {
    const url = new URL(publicUrl)
    const pathParts = url.pathname.split(`/storage/v1/object/public/${AVATAR_BUCKET}/`)
    return pathParts[1] || null
  } catch {
    return null
  }
}
