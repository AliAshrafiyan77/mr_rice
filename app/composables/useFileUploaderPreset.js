import { FILE_UPLOADER_PRESETS } from '~/config/fileUploaderPresets'

export function useFileUploaderPreset(purpose) {
  const preset = FILE_UPLOADER_PRESETS[purpose]

  if (!preset) {
    throw new Error(`Unknown file uploader preset: "${purpose}"`)
  }

  return preset
}

export function getFileUploaderPresetIds() {
  return Object.keys(FILE_UPLOADER_PRESETS)
}
