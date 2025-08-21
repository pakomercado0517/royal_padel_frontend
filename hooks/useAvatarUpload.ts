'use client'

import { useState } from 'react'
import { 
  supabaseStorage, 
  AVATAR_BUCKET, 
  generateFileName,
  extractFilePathFromUrl 
} from '@/lib/supabase-storage'
import { validateAvatarFile } from '@/lib/avatar-utils'

/**
 * Hook personalizado para manejar upload de avatares
 * 
 * Este hook encapsula toda la lógica de:
 * 1. Validación de archivos
 * 2. Upload a Supabase Storage
 * 3. Obtención de URLs públicas
 * 4. Eliminación de archivos
 * 5. Estados de loading y error
 */
export const useAvatarUpload = () => {
  // Estados para controlar el UI y feedback al usuario
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * FUNCIÓN PRINCIPAL: uploadAvatar
   * 
   * Esta función maneja todo el proceso de upload:
   * 1. Validar el archivo
   * 2. Generar nombre único
   * 3. Subir a Supabase Storage
   * 4. Obtener URL pública
   * 5. Retornar URL para guardar en tu backend
   */
  const uploadAvatar = async (
    file: File, 
    userId?: string
  ): Promise<string> => {
    try {
      // 1. INICIALIZAR ESTADOS
      setUploading(true)  // Mostrar loading spinner
      setError(null)      // Limpiar errores previos
      
      console.log('🚀 Iniciando upload de avatar:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        userId
      })

      // 2. VALIDAR ARCHIVO
      // Esta función verifica tipo y tamaño según nuestras constantes
      const validation = validateAvatarFile(file)
      if (!validation.isValid) {
        throw new Error(validation.error)
      }
      console.log('✅ Archivo validado correctamente')

      // 3. GENERAR NOMBRE ÚNICO
      // Esto evita conflictos y organiza archivos por usuario
      const filePath = generateFileName(file.name, userId)
      console.log('📝 Nombre generado:', filePath)

      // 4. UPLOAD A SUPABASE STORAGE
      // Esta es la operación principal - subir el archivo
      const { data: uploadData, error: uploadError } = await supabaseStorage.storage
        .from(AVATAR_BUCKET)  // Usar nuestro bucket 'avatars'
        .upload(filePath, file, {
          cacheControl: '3600',    // Cache por 1 hora (optimización)
          upsert: false           // No sobrescribir, crear siempre nuevo
        })

      // 5. VERIFICAR SI EL UPLOAD FUE EXITOSO
      if (uploadError) {
        console.error('❌ Error en upload:', uploadError)
        throw new Error(`Error al subir archivo: ${uploadError.message}`)
      }

      console.log('✅ Archivo subido exitosamente:', uploadData)

      // 6. OBTENER URL PÚBLICA
      // Supabase nos da una URL pública para acceder al archivo
      const { data: urlData } = supabaseStorage.storage
        .from(AVATAR_BUCKET)
        .getPublicUrl(filePath)

      console.log('🔗 URL pública obtenida:', urlData.publicUrl)

      // 7. VERIFICAR QUE LA URL ES VÁLIDA
      if (!urlData.publicUrl) {
        throw new Error('No se pudo obtener URL pública del archivo')
      }

      // 8. RETORNAR URL PARA TU BACKEND
      // Esta URL es lo que guardas en tu base de datos
      return urlData.publicUrl

    } catch (error) {
      // MANEJO DE ERRORES
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al subir archivo'
      console.error('💥 Error en uploadAvatar:', error)
      setError(errorMessage)
      throw error  // Re-lanzar para que el componente pueda manejarlo
    } finally {
      // SIEMPRE limpiar el estado de loading
      setUploading(false)
    }
  }

  /**
   * FUNCIÓN SECUNDARIA: deleteFromStorage
   * 
   * Elimina un archivo del storage usando su URL pública
   * Esto es útil para limpiar archivos que ya no se usan
   */
  const deleteFromStorage = async (avatarUrl: string): Promise<void> => {
    try {
      setDeleting(true)
      setError(null)
      
      console.log('🗑️ Iniciando eliminación de avatar:', avatarUrl)

      // 1. EXTRAER PATH DEL ARCHIVO DESDE LA URL
      // La URL contiene el path que necesitamos para eliminar
      const filePath = extractFilePathFromUrl(avatarUrl)
      
      if (!filePath) {
        throw new Error('No se pudo extraer el path del archivo desde la URL')
      }

      console.log('📂 Path extraído:', filePath)

      // 2. ELIMINAR ARCHIVO DEL STORAGE
      const { error: deleteError } = await supabaseStorage.storage
        .from(AVATAR_BUCKET)
        .remove([filePath])  // Supabase acepta array de paths

      if (deleteError) {
        console.error('❌ Error al eliminar:', deleteError)
        throw new Error(`Error al eliminar archivo: ${deleteError.message}`)
      }

      console.log('✅ Archivo eliminado exitosamente del storage')

    } catch (error) {
      // NOTA IMPORTANTE: No hacer throw aquí
      // Si falla el delete del storage, al menos que se actualice la BD
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar archivo'
      console.warn('⚠️ Error en deleteFromStorage:', error)
      setError(errorMessage)
      
      // Solo loggeamos el error, no interrumpimos el flujo
      // porque lo más importante es actualizar la BD
    } finally {
      setDeleting(false)
    }
  }

  /**
   * FUNCIÓN UTILITARIA: clearError
   * 
   * Permite limpiar errores manualmente desde el componente
   */
  const clearError = () => {
    setError(null)
  }

  /**
   * FUNCIÓN UTILITARIA: getUploadProgress
   * 
   * En el futuro podrías extender esto para mostrar progreso real
   * Por ahora solo indica si está subiendo o no
   */
  const getUploadStatus = () => {
    if (uploading) return 'uploading'
    if (deleting) return 'deleting' 
    return 'idle'
  }

  // RETORNAR API DEL HOOK
  // Esto es lo que los componentes pueden usar
  return {
    // Funciones principales
    uploadAvatar,
    deleteFromStorage,
    clearError,
    
    // Estados para el UI
    uploading,
    deleting,
    error,
    
    // Utilidades
    isProcessing: uploading || deleting,  // Computed state útil
    status: getUploadStatus()
  }
}

/**
 * TYPES PARA TYPESCRIPT
 * 
 * Estos tipos ayudan con el intellisense y type safety
 */
export type AvatarUploadHook = ReturnType<typeof useAvatarUpload>

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}
