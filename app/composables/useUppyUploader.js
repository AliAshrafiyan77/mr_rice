import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'

function mapRestrictionError(error, preset) {
  if (!error) {
    return 'فایل نامعتبر است'
  }

  const message = error.message || ''

  if (message.includes('allowedFileTypes') || message.includes('type')) {
    return preset.errors.type
  }

  if (message.includes('maxFileSize') || message.includes('size')) {
    return preset.errors.size
  }

  if (message.includes('maxNumberOfFiles') || message.includes('number')) {
    return preset.errors.maxFiles
  }

  return message
}

function mapUploadError(error) {
  const message = error?.message || ''

  if (message.includes('network error') || message.includes('internet provider')) {
    return 'خطا در ارتباط با سرور. اتصال اینترنت، آدرس API (BASE_URL) و CORS را بررسی کنید.'
  }

  return message || 'خطا در بارگذاری فایل'
}

function parseUploadResponse(responseText) {
  const body = JSON.parse(responseText || '{}')

  if (!body.status || !body.file) {
    throw new Error(body?.data?.message || body?.message || 'خطا در بارگذاری فایل')
  }

  return body.file
}

function resolveUploadEndpoint(baseUrl) {
  const normalizedBase = (baseUrl || '').replace(/\/$/, '')

  if (!normalizedBase) {
    throw new Error('BASE_URL در تنظیمات Nuxt تعریف نشده است')
  }

  return `${normalizedBase}/api/admin/upload`
}

export function useUppyUploader(options) {
  const {
    preset,
    multiple = false,
    autoUpload = true,
    onUploaded,
    onError,
    onRemoved,
    onModelUpdate,
  } = options

  const config = useRuntimeConfig()
  const { $api } = useNuxtApp()
  const { request: apiRequest } = useApi()

  const uppy = shallowRef(null)
  const files = ref([])
  const isUploading = ref(false)
  const errorMessage = ref(null)
  const isDragging = ref(false)

  const maxFiles = multiple ? preset.maxNumberOfFiles : 1
  const uploadEndpoint = resolveUploadEndpoint(config.public.baseUrl)

  const csrf = () => $api('/sanctum/csrf-cookie')

  const getUploadHeaders = () => {
    const token = useCookie('XSRF-TOKEN').value

    return {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(token ? { 'X-XSRF-TOKEN': decodeURIComponent(token) } : {}),
    }
  }

  const previewCache = new Map()

  const syncFilesFromUppy = () => {
    if (!uppy.value) {
      files.value = []
      return
    }

    files.value = uppy.value.getFiles().map((file) => {
      let preview = null

      if (file.type?.startsWith('image/')) {
        if (!previewCache.has(file.id)) {
          previewCache.set(file.id, URL.createObjectURL(file.data))
        }
        preview = previewCache.get(file.id)
      }

      return {
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        preview,
        progress: file.progress?.percentage ?? 0,
        status: file.error ? 'error' : file.progress?.uploadComplete ? 'complete' : file.progress?.uploadStarted ? 'uploading' : 'queued',
        error: file.error?.message,
        uploaded: file.meta?.uploadedData || null,
      }
    })
  }

  const emitModelValue = () => {
    if (!uppy.value) {
      onModelUpdate?.(multiple ? [] : null)
      return
    }

    const uploaded = uppy.value
      .getFiles()
      .map((file) => file.meta?.uploadedData)
      .filter(Boolean)

    const value = multiple ? uploaded : uploaded[0] ?? null
    onModelUpdate?.(value)
  }

  const addRawFiles = async (rawFiles) => {
    if (!uppy.value || !rawFiles?.length) {
      return
    }

    errorMessage.value = null

    for (const rawFile of rawFiles) {
      try {
        uppy.value.addFile({
          source: 'local',
          name: rawFile.name,
          type: rawFile.type,
          data: rawFile,
          meta: { purpose: preset.id },
        })
      } catch (error) {
        errorMessage.value = mapRestrictionError(error, preset)
        onError?.(errorMessage.value)
      }
    }

    syncFilesFromUppy()

    if (autoUpload && uppy.value.getFiles().some((file) => !file.progress?.uploadComplete)) {
      try {
        await csrf()
        uppy.value.upload()
      } catch (error) {
        const message = mapUploadError(error)
        errorMessage.value = message
        onError?.(message)
      }
    }
  }

  const removeFile = async (fileId) => {
    if (!uppy.value) {
      return
    }

    const file = uppy.value.getFile(fileId)
    const uploaded = file?.meta?.uploadedData

    if (uploaded?.path) {
      try {
        await apiRequest('DELETE', '/api/admin/upload', {
          path: uploaded.path,
          purpose: uploaded.purpose || preset.id,
        })
      } catch (error) {
        const message = error?.data?.data?.message || error?.data?.message || 'خطا در حذف فایل از سرور'
        errorMessage.value = message
        onError?.(message)
        return
      }
    }

    const previewUrl = previewCache.get(fileId)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      previewCache.delete(fileId)
    }

    uppy.value.removeFile(fileId)
    syncFilesFromUppy()
    emitModelValue()

    if (uploaded) {
      onRemoved?.(uploaded)
    }
  }

  const initUppy = () => {
    const instance = new Uppy({
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: maxFiles,
        maxFileSize: preset.maxFileSize,
        allowedFileTypes: preset.allowedFileTypes,
      },
      locale: {
        strings: {
          exceedsSize: preset.errors.size,
          youCanOnlyUploadFileTypes: preset.errors.type,
          youCanOnlyUploadX: preset.errors.maxFiles,
        },
      },
    })

    instance.use(XHRUpload, {
      endpoint: uploadEndpoint,
      fieldName: preset.fieldName,
      formData: true,
      bundle: false,
      withCredentials: true,
      allowedMetaFields: ['purpose'],
      headers: () => getUploadHeaders(),
      getResponseData: (xhr) => parseUploadResponse(xhr.responseText),
      getResponseError: (_responseText, xhr) => {
        try {
          const body = JSON.parse(xhr?.responseText || '{}')
          return new Error(body?.data?.message || body?.message || xhr?.statusText || 'خطا در بارگذاری')
        } catch {
          return new Error('خطا در بارگذاری فایل')
        }
      },
    })

    instance.on('file-added', (file) => {
      instance.setFileMeta(file.id, { purpose: preset.id })
      syncFilesFromUppy()
    })

    instance.on('upload', () => {
      isUploading.value = true
      errorMessage.value = null
    })

    instance.on('upload-progress', () => {
      syncFilesFromUppy()
    })

    instance.on('upload-success', (file, response) => {
      const uploadedData = response?.body

      if (!uploadedData?.url) {
        const message = 'پاسخ سرور نامعتبر است'
        errorMessage.value = message
        onError?.(message)
        syncFilesFromUppy()
        return
      }

      instance.setFileMeta(file.id, { uploadedData })
      syncFilesFromUppy()
      emitModelValue()
      onUploaded?.(uploadedData)
    })

    instance.on('upload-error', (file, error) => {
      const message = mapUploadError(error)
      errorMessage.value = message
      onError?.(message)
      syncFilesFromUppy()
    })

    instance.on('complete', () => {
      isUploading.value = false
      syncFilesFromUppy()
    })

    instance.on('restriction-failed', (_, error) => {
      errorMessage.value = mapRestrictionError(error, preset)
      onError?.(errorMessage.value)
    })

    uppy.value = instance
  }

  onMounted(() => {
    initUppy()
  })

  onBeforeUnmount(() => {
    previewCache.forEach((url) => URL.revokeObjectURL(url))
    previewCache.clear()

    uppy.value?.destroy()
    uppy.value = null
  })

  return {
    uppy,
    files,
    isUploading,
    errorMessage,
    isDragging,
    addRawFiles,
    removeFile,
    syncFilesFromUppy,
  }
}
