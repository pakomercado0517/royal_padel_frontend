'use client'

import { useState } from 'react'
import { supabaseStorage, AVATAR_BUCKET } from '@/lib/supabase-storage'

/**
 * Hook para testing de la conexión con Supabase Storage
 * Solo para verificar que la configuración funciona
 */
export const useSupabaseTest = () => {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    message: string
    details?: any
  } | null>(null)

  const testConnection = async () => {
    setTesting(true)
    setResult(null)

    try {
      // Test 1: Listar buckets disponibles
      const { data: buckets, error: bucketsError } = await supabaseStorage.storage.listBuckets()
      
      if (bucketsError) {
        throw new Error(`Error al listar buckets: ${bucketsError.message}`)
      }

      // Test 2: Verificar si existe el bucket de avatares
      const avatarBucket = buckets?.find(bucket => bucket.name === AVATAR_BUCKET)
      
      if (!avatarBucket) {
        throw new Error(`Bucket '${AVATAR_BUCKET}' no encontrado. Disponibles: ${buckets?.map(b => b.name).join(', ')}`)
      }

      // Test 3: Intentar listar archivos en el bucket (debería funcionar aunque esté vacío)
      const { data: files, error: filesError } = await supabaseStorage.storage
        .from(AVATAR_BUCKET)
        .list('', { limit: 1 })

      if (filesError) {
        throw new Error(`Error al acceder al bucket: ${filesError.message}`)
      }

      setResult({
        success: true,
        message: '✅ Conexión exitosa con Supabase Storage',
        details: {
          bucketsFound: buckets?.length || 0,
          avatarBucketExists: true,
          canAccessBucket: true,
          filesInBucket: files?.length || 0
        }
      })

    } catch (error) {
      setResult({
        success: false,
        message: `❌ Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        details: { error }
      })
    } finally {
      setTesting(false)
    }
  }

  const resetTest = () => {
    setResult(null)
  }

  return {
    testConnection,
    resetTest,
    testing,
    result
  }
}
