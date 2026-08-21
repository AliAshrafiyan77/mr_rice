<template>
  <ClientOnly>
    <div class="file-uploader w-full">
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
    <div class="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600"
        aria-hidden="true"
      >
        <UploadIcon class="h-6 w-6"/>
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
  </div>

  <p v-if="errorMessage" class="mt-2 text-xs text-danger">
    {{ errorMessage }}
  </p>

  <ul v-if="existingImage || files.length" class="mt-3 space-y-2">
    <li
      v-if="existingImage"
      class="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
    >
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface"
      >
        <img
          :src="existingImage.url"
          alt="تصویر فعلی"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-text">تصویر فعلی</p>
        <p class="mt-1 text-xs text-muted">تصویر ذخیره‌شده در سرور</p>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
        aria-label="حذف تصویر"
        @click.stop="removeExistingImage"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>

    <li
      v-for="file in files"
      :key="file.id"
      class="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
    >
      <div
        class="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface"
      >
        <img
          v-if="file.preview"
          :src="file.preview"
          :alt="file.name"
          class="h-full w-full object-cover"
        />
        <svg
          v-else
          class="h-6 w-6 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.5h-1.5a3.375 3.375 0 00-3.375 3.375V14.25m6 0v1.125c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0110.5 16.5v-1.125m6 0h-7.5" />
        </svg>
      </div>

      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-text">{{ file.name }}</p>
        <p class="text-xs text-muted">{{ formatSize(file.size) }}</p>

        <div v-if="file.status === 'uploading'" class="mt-2">
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              class="h-full rounded-full bg-primary-500 transition-all duration-200"
              :style="{ width: `${file.progress}%` }"
            />
          </div>
          <p class="mt-1 text-xs text-muted">در حال بارگذاری… {{ Math.round(file.progress) }}%</p>
        </div>

        <p v-else-if="file.status === 'complete'" class="mt-1 text-xs text-success">
          بارگذاری موفق
        </p>

        <p v-else-if="file.status === 'error'" class="mt-1 text-xs text-danger">
          {{ file.error || 'خطا در بارگذاری' }}
        </p>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
        :disabled="isUploading && file.status === 'uploading'"
        aria-label="حذف فایل"
        @click.stop="removeFile(file.id)"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
import UploadIcon from '~/components/icons/UploadIcon.vue'

const props = defineProps({
  purpose: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: [Object, Array, String, null],
    default: null,
  },
  existingImageUrl: {
    type: String,
    default: null,
  },
  existingImagePath: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'uploaded', 'error', 'removed'])

const preset = useFileUploaderPreset(props.purpose)
const fileInputRef = ref(null)
const { request: apiRequest } = useApi()

const existingImage = ref(null)
const existingImageDismissed = ref(false)

const maxFiles = computed(() => (props.multiple ? preset.maxNumberOfFiles : 1))

function dismissExistingImage() {
  existingImage.value = null
  existingImageDismissed.value = true
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
  autoUpload: props.autoUpload,
  onUploaded: (file) => emit('uploaded', file),
  onError: (message) => emit('error', message),
  onRemoved: (file) => emit('removed', file),
  onModelUpdate: (value) => emit('update:modelValue', value),
  onFileAdded: () => {
    dismissExistingImage()
  },
})

const showDropzone = computed(() => {
  const occupiedSlots = (existingImage.value ? 1 : 0) + files.value.length
  return occupiedSlots < maxFiles.value
})

function syncExistingImageFromProp() {
  if (existingImageDismissed.value || files.value.length) {
    return
  }

  if (props.existingImageUrl) {
    existingImage.value = {
      url: props.existingImageUrl,
      path: props.existingImagePath,
      source: 'existing',
    }
    return
  }

  existingImage.value = null
}

watch(
  () => [props.existingImageUrl, props.existingImagePath],
  ([url], oldValue) => {
    const previousUrl = oldValue?.[0]

    if (oldValue && url !== previousUrl) {
      existingImageDismissed.value = false
    }

    syncExistingImageFromProp()
  },
  { immediate: true },
)

async function removeExistingImage() {
  const removed = existingImage.value

  if (removed?.path) {
    try {
      await apiRequest('DELETE', '/api/admin/upload', {
        path: removed.path,
        purpose: preset.id,
      })
    } catch (error) {
      const message = error?.data?.data?.message || error?.data?.message || 'خطا در حذف فایل از سرور'
      errorMessage.value = message
      emit('error', message)
      return
    }
  }

  dismissExistingImage()
  emit('update:modelValue', null)
  emit('removed', { source: 'existing', url: removed?.url, path: removed?.path })
}

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
</script>
