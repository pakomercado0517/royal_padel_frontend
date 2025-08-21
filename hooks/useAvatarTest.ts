'use client'

import { useState } from 'react'
import { useAvatarUpload } from './useAvatarUpload'

/**
 * Hook especializado para testing del sistema de avatares
 * 
 * Este hook te permite probar todas las funcionalidades
 * antes de integrar con tu backend real
 */
export const useAvatarTest = () => {
  const [testResults, setTestResults] = useState<any[]>([])
  const { uploadAvatar, deleteFromStorage, uploading, deleting, error } = useAvatarUpload()

  /**
   * TEST 1: Probar upload básico
   * 
   * Sube un archivo de prueba y verifica que funcione
   */
  const testBasicUpload = async (file: File) => {
    const testId = `test-upload-${Date.now()}`
    
    try {
      console.log('🧪 Iniciando test de upload básico...')
      
      const startTime = Date.now()
      const url = await uploadAvatar(file, 'test-user')
      const endTime = Date.now()
      
      const result = {
        id: testId,
        test: 'Basic Upload',
        success: true,
        duration: endTime - startTime,
        url,
        details: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }
      }
      
      setTestResults(prev => [...prev, result])
      console.log('✅ Test de upload exitoso:', result)
      
      return result
      
    } catch (error) {
      const result = {
        id: testId,
        test: 'Basic Upload',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        details: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }
      }
      
      setTestResults(prev => [...prev, result])
      console.log('❌ Test de upload falló:', result)
      
      return result
    }
  }

  /**
   * TEST 2: Probar eliminación
   * 
   * Elimina un archivo por su URL
   */
  const testDelete = async (url: string) => {
    const testId = `test-delete-${Date.now()}`
    
    try {
      console.log('🧪 Iniciando test de eliminación...')
      
      const startTime = Date.now()
      await deleteFromStorage(url)
      const endTime = Date.now()
      
      const result = {
        id: testId,
        test: 'Delete File',
        success: true,
        duration: endTime - startTime,
        url,
        details: {
          deletedUrl: url
        }
      }
      
      setTestResults(prev => [...prev, result])
      console.log('✅ Test de eliminación exitoso:', result)
      
      return result
      
    } catch (error) {
      const result = {
        id: testId,
        test: 'Delete File',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        details: {
          attemptedUrl: url
        }
      }
      
      setTestResults(prev => [...prev, result])
      console.log('❌ Test de eliminación falló:', result)
      
      return result
    }
  }

  /**
   * TEST 3: Probar validaciones de archivo
   * 
   * Intenta subir archivos inválidos para verificar validaciones
   */
  const testValidations = async () => {
    const testId = `test-validations-${Date.now()}`
    
    try {
      console.log('🧪 Iniciando test de validaciones...')
      
      // Crear archivo de prueba muy grande (simulado)
      const oversizedFile = new File(
        [new ArrayBuffer(6 * 1024 * 1024)], // 6MB
        'oversized.jpg',
        { type: 'image/jpeg' }
      )
      
      // Esto debería fallar por ser muy grande
      await uploadAvatar(oversizedFile, 'test-user')
      
      // Si llega aquí, la validación falló
      const result = {
        id: testId,
        test: 'File Validations',
        success: false,
        error: 'La validación de tamaño no funcionó correctamente'
      }
      
      setTestResults(prev => [...prev, result])
      return result
      
    } catch (error) {
      // Si llega aquí, la validación funcionó correctamente
      const result = {
        id: testId,
        test: 'File Validations',
        success: true,
        details: {
          validationWorking: true,
          errorCaught: error instanceof Error ? error.message : 'Error desconocido'
        }
      }
      
      setTestResults(prev => [...prev, result])
      console.log('✅ Test de validaciones exitoso:', result)
      
      return result
    }
  }

  /**
   * EJECUTAR TODOS LOS TESTS
   * 
   * Función conveniente para ejecutar una suite completa de tests
   */
  const runAllTests = async (testFile: File) => {
    console.log('🧪 Iniciando suite completa de tests...')
    
    // Limpiar resultados previos
    setTestResults([])
    
    const results = []
    
    // Test 1: Upload básico
    const uploadResult = await testBasicUpload(testFile)
    results.push(uploadResult)
    
    // Test 2: Validaciones (si el upload funcionó)
    const validationResult = await testValidations()
    results.push(validationResult)
    
    // Test 3: Delete (si el upload funcionó)
    if (uploadResult.success && uploadResult.url) {
      const deleteResult = await testDelete(uploadResult.url)
      results.push(deleteResult)
    }
    
    console.log('🧪 Suite de tests completada:', results)
    return results
  }

  /**
   * LIMPIAR RESULTADOS
   */
  const clearResults = () => {
    setTestResults([])
  }

  /**
   * OBTENER ESTADÍSTICAS DE TESTS
   */
  const getTestStats = () => {
    const total = testResults.length
    const passed = testResults.filter(r => r.success).length
    const failed = total - passed
    
    return {
      total,
      passed,
      failed,
      passRate: total > 0 ? (passed / total) * 100 : 0
    }
  }

  return {
    // Funciones de testing
    testBasicUpload,
    testDelete,
    testValidations,
    runAllTests,
    
    // Gestión de resultados
    clearResults,
    testResults,
    getTestStats,
    
    // Estados del upload hook
    uploading,
    deleting,
    error,
    isProcessing: uploading || deleting
  }
}
