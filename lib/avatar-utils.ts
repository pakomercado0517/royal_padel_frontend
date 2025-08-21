import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './supabase-storage'

/**
 * Generar iniciales a partir del nombre completo
 */
export const getInitials = (name: string): string => {
  if (!name || name.trim() === '') return 'U'
  
  return name
    .trim()
    .split(' ')
    .filter(part => part.length > 0)
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Generar iniciales a partir del email si no hay nombre
 */
export const getInitialsFromEmail = (email: string): string => {
  if (!email) return 'U'
  
  const parts = email.split('@')[0].split('.')
  return parts
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

/**
 * Validar archivo de avatar
 */
export interface FileValidationResult {
  isValid: boolean
  error?: string
}

export const validateAvatarFile = (file: File): FileValidationResult => {
  // Validar tipo de archivo
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Tipo de archivo no permitido. Solo se permiten: ${ALLOWED_FILE_TYPES.join(', ')}`
    }
  }
  
  // Validar tamaño
  if (file.size > MAX_FILE_SIZE) {
    const maxSizeMB = MAX_FILE_SIZE / (1024 * 1024)
    return {
      isValid: false,
      error: `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`
    }
  }
  
  return { isValid: true }
}

/**
 * Generar URL de avatar con fallback
 */
export const getAvatarUrl = (avatarUrl: string | null, fallbackSeed: string): string => {
  if (avatarUrl && avatarUrl.trim() !== '') {
    return avatarUrl
  }
  
  // Fallback a Dicebear API
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackSeed)}`
}

/**
 * Crear preview de imagen desde File
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === 'string') {
        resolve(result)
      } else {
        reject(new Error('No se pudo crear preview de la imagen'))
      }
    }
    
    reader.onerror = () => reject(new Error('Error al leer el archivo'))
    reader.readAsDataURL(file)
  })
}

/**
 * Redimensionar imagen (opcional, para optimización)
 */
export const resizeImage = (
  file: File, 
  maxWidth: number = 800, 
  maxHeight: number = 800, 
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo proporción
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Dibujar imagen redimensionada
      ctx?.drawImage(img, 0, 0, width, height)
      
      // Convertir a blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('No se pudo redimensionar la imagen'))
          }
        },
        file.type,
        quality
      )
    }
    
    img.onerror = () => reject(new Error('No se pudo cargar la imagen'))
    img.src = URL.createObjectURL(file)
  })
}
