<template>
  <ClientOnly>
    <div class="uppy-image-uploader w-full">
      <input
        ref="fileInputRef"
        type="file"
        class="hidden"
        :accept="preset.accept"
        :multiple="multiple"
        @change="onInputChange"
      />

      <div
        v-if="showDropzone"
        class="relative rounded-xl border-2 border-dashed transition-colors cursor-pointer"
        :class="dropzoneClasses"
        @click="openFilePicker"
        @dragenter.prevent="isDragging = true"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <slot name="dropzone" :preset="preset" :is-dragging="isDragging">
          <div class="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600"
              aria-hidden="true"
            >
              <UiIcon name="upload" class="h-6 w-6" />
            </div>

            <div>
              <p class="text-sm font-medium text-text">
                {{ preset.label }} را بکشید و رها کنید
              </p>
              <p class="mt-1 text-xs text-muted">
                یا <span class="text-primary-600 font-medium">برای انتخاب کلیک کنید</span>
              </p>
              <p class="mt-2 text-xs text-muted">{{ preset.helperText }}</p>
            </div>
          </div>
        </slot>
      </div>

      <p v-if="errorMessage" class="mt-2 text-xs text-danger">
        {{ errorMessage }}
      </p>

      <ul v-if="orderedItems.length" class="mt-3 space-y-2">
        <li
          v-for="(item, index) in orderedItems"
          :key="item.key"
          class="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
          :class="multiple ? 'cursor-grab active:cursor-grabbing' : ''"
          :draggable="multiple && !disabled"
          @dragstart="onDragStart(index)"
          @dragover.prevent="onDragOver(index)"
          @drop.prevent="onDropReorder(index)"
        >
          <slot name="file-item" :file="item" :index="index">
            <div
              v-if="multiple"
              class="flex h-8 w-8 shrink-0 items-center justify-center text-muted"
              aria-hidden="true"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            </div>

            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface"
            >
              <img
                :src="item.url"
                :alt="item.name || 'تصویر'"
                class="h-full w-full object-cover"
              />
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="truncate text-sm font-medium text-text">
                  {{ item.name || (item.source === 'existing' ? 'تصویر فعلی' : 'تصویر بارگذاری‌شده') }}
                </p>
                <span
                  v-if="index === 0"
                  class="shrink-0 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700"
                >
                  <slot name="cover-badge">تصویر اصلی</slot>
                </span>
              </div>

              <p v-if="item.size" class="text-xs text-muted">{{ formatSize(item.size) }}</p>

              <div v-if="item.status === 'uploading'" class="mt-2">
                <div class="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    class="h-full rounded-full bg-primary-500 transition-all duration-200"
                    :style="{ width: `${item.progress}%` }"
                  />
                </div>
                <p class="mt-1 text-xs text-muted">در حال بارگذاری… {{ Math.round(item.progress) }}%</p>
              </div>

              <p v-else-if="item.status === 'complete' || item.source === 'existing'" class="mt-1 text-xs text-success">
                {{ item.source === 'existing' ? 'ذخیره‌شده در سرور' : 'بارگذاری موفق' }}
              </p>

              <p v-else-if="item.status === 'error'" class="mt-1 text-xs text-danger">
                {{ item.error || 'خطا در بارگذاری' }}
              </p>
            </div>

            <button
              type="button"
              class="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
              :disabled="disabled || (isUploading && item.status === 'uploading')"
              aria-label="حذف فایل"
              @click.stop="removeItem(item)"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </slot>
        </li>
      </ul>
    </div>

    <template #fallback>
      <div class="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-background text-sm text-muted">
        در حال بارگذاری...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { useFileUploaderPreset } from '~/composables/useFileUploaderPreset'
import { useUppyUploader } from '~/composables/useUppyUploader'
import {
  assignSortOrder,
  assignTypes,
  buildUploadMeta,
  normalizeUploadedFile,
  reorderFiles,
  resolveImageUploadEndpoint,
  toUploadedPayload,
} from '~/composables/useImageUpload'

const props = defineProps({
  uploadType: {
    type: String,
    required: true,
    validator: (value) => ['category', 'product-variation'].includes(value),
  },
  entityId: {
    type: [Number, String, null],
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  maxFiles: {
    type: Number,
    default: 1,
  },
  existingImages: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['uploaded', 'error', 'removed', 'update:modelValue'])

const preset = useFileUploaderPreset('image')
const config = useRuntimeConfig()
const { request: apiRequest } = useApi()
const fileInputRef = ref(null)

const galleryItems = ref([])
const dragFromIndex = ref(null)

const uploadMeta = computed(() => buildUploadMeta(
  props.uploadType,
  props.entityId ? Number(props.entityId) : null,
))

const syncUploadingState = () => {
  galleryItems.value = galleryItems.value.map((item) => {
    if (item.source !== 'uploaded' || !item.uppyId) {
      return item
    }

    const uppyFile = files.value.find((file) => file.id === item.uppyId)

    if (!uppyFile) {
      return item
    }

    return {
      ...item,
      progress: uppyFile.progress,
      status: uppyFile.status,
      error: uppyFile.error,
      url: uppyFile.uploaded?.url || uppyFile.preview || item.url,
      path: uppyFile.uploaded?.path || item.path,
      filename: uppyFile.uploaded?.stored_name || item.filename,
      stored_name: uppyFile.uploaded?.stored_name || item.stored_name,
      uploaded: uppyFile.uploaded,
    }
  })
}

const {
  files,
  isUploading,
  errorMessage,
  isDragging,
  addRawFiles,
  removeFile,
} = useUppyUploader({
  preset,
  multiple: props.multiple,
  maxNumberOfFiles: props.maxFiles,
  endpoint: resolveImageUploadEndpoint(config.public.baseUrl),
  allowedMetaFields: true,
  uploadMeta,
  onUploaded: (uploaded) => {
    const normalized = normalizeUploadedFile(uploaded)
    const uppyFile = files.value.find((file) => file.uploaded?.id === uploaded.id)

    if (!uppyFile) {
      emitUploaded()
      return
    }

    const index = galleryItems.value.findIndex((item) => item.uppyId === uppyFile.id)

    if (index === -1) {
      galleryItems.value.push({
        key: `uploaded-${uppyFile.id}`,
        source: 'uploaded',
        uppyId: uppyFile.id,
        name: uppyFile.name,
        size: uppyFile.size,
        url: normalized.url,
        path: normalized.path,
        filename: normalized.stored_name,
        stored_name: normalized.stored_name,
        status: 'complete',
        progress: 100,
      })
    } else {
      galleryItems.value[index] = {
        ...galleryItems.value[index],
        url: normalized.url,
        path: normalized.path,
        filename: normalized.stored_name,
        stored_name: normalized.stored_name,
        status: 'complete',
        progress: 100,
      }
    }

    emitUploaded()
  },
  onError: (message) => emit('error', message),
  onRemoved: (file) => emit('removed', file),
  onFileAdded: (file) => {
    if (!props.multiple) {
      galleryItems.value = galleryItems.value.filter((item) => item.source === 'existing')
    }

    galleryItems.value.push({
      key: `uploaded-${file.id}`,
      source: 'uploaded',
      uppyId: file.id,
      name: file.name,
      size: file.size,
      url: null,
      status: 'uploading',
      progress: 0,
    })
  },
})

watch(files, () => {
  syncUploadingState()
}, { deep: true })

const orderedItems = computed(() => assignSortOrder(assignTypes(galleryItems.value)))

const showDropzone = computed(() => {
  if (props.disabled) {
    return false
  }

  return galleryItems.value.length < props.maxFiles
})

const dropzoneClasses = computed(() => {
  if (props.disabled) {
    return 'border-border bg-background/60 opacity-60 cursor-not-allowed'
  }

  if (isDragging.value) {
    return 'border-primary-400 bg-primary-50'
  }

  if (errorMessage.value) {
    return 'border-danger/40 bg-danger/5 hover:border-danger/60'
  }

  return 'border-border bg-background hover:border-primary-300 hover:bg-primary-50/40'
})

function syncExistingImages() {
  const existing = props.existingImages.map((image, index) => ({
    key: `existing-${image.filename || image.path || index}`,
    source: 'existing',
    name: image.name || 'تصویر فعلی',
    url: image.url,
    path: image.path?.startsWith('uploads/') ? image.path : image.path ? `uploads/${image.path}` : null,
    filename: image.filename,
    stored_name: image.filename,
    type: image.type,
    sort_order: image.sort_order ?? index,
    status: 'complete',
  }))

  const uploaded = galleryItems.value.filter((item) => item.source === 'uploaded')
  galleryItems.value = [...existing, ...uploaded]
}

function emitUploaded() {
  const payload = toUploadedPayload(
    orderedItems.value.map((item) => ({
      filename: item.filename || item.stored_name,
      stored_name: item.stored_name || item.filename,
      path: item.path,
      url: item.url,
      type: item.type,
      sort_order: item.sort_order,
    })),
  )

  emit('uploaded', props.multiple ? payload : payload[0] ?? null)
  emit('update:modelValue', props.multiple ? payload : payload[0] ?? null)
}

function onDragStart(index) {
  dragFromIndex.value = index
}

function onDragOver() {}

function onDropReorder(toIndex) {
  if (dragFromIndex.value === null || dragFromIndex.value === toIndex) {
    dragFromIndex.value = null
    return
  }

  galleryItems.value = reorderFiles(galleryItems.value, dragFromIndex.value, toIndex)
  dragFromIndex.value = null
  emitUploaded()
}

async function removeItem(item) {
  if (item.source === 'existing') {
    if (item.path) {
      try {
        await apiRequest('DELETE', '/api/admin/upload', {
          path: item.path.startsWith('uploads/') ? item.path : `uploads/${item.path}`,
          purpose: 'image',
        })
      } catch (error) {
        const message = error?.data?.data?.message || error?.data?.message || 'خطا در حذف فایل از سرور'
        errorMessage.value = message
        emit('error', message)
        return
      }
    }

    galleryItems.value = galleryItems.value.filter((galleryItem) => galleryItem.key !== item.key)
    emit('removed', { source: 'existing', ...item })
    emitUploaded()
    return
  }

  if (item.uppyId) {
    await removeFile(item.uppyId)
  }

  galleryItems.value = galleryItems.value.filter((galleryItem) => galleryItem.key !== item.key)
  emitUploaded()
}

function formatSize(bytes) {
  if (!bytes) {
    return ''
  }

  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function openFilePicker() {
  if (props.disabled) {
    return
  }

  fileInputRef.value?.click()
}

function onInputChange(event) {
  const selected = Array.from(event.target.files || [])
  event.target.value = ''
  addRawFiles(selected)
}

function onDrop(event) {
  isDragging.value = false

  if (props.disabled) {
    return
  }

  addRawFiles(Array.from(event.dataTransfer?.files || []))
}

watch(
  () => props.existingImages,
  () => {
    syncExistingImages()
  },
  { immediate: true, deep: true },
)

defineExpose({
  normalizeUploadedFile,
  toUploadedPayload,
})
</script>
