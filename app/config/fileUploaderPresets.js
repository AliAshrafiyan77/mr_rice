/**
 * File uploader presets — add new purposes here without changing FileUploader.vue
 *
 * @typedef {Object} FileUploaderPreset
 * @property {string} id
 * @property {string} label
 * @property {string} helperText
 * @property {string[]} allowedFileTypes - MIME types for Uppy restrictions
 * @property {string[]} extensions - Human-readable extension list
 * @property {number} maxFileSize - bytes
 * @property {number} maxNumberOfFiles
 * @property {string} accept - HTML input accept attribute
 * @property {string} fieldName - multipart field name
 * @property {Object} errors - Persian error messages
 */

export const FILE_UPLOADER_PRESETS = {
  image: {
    id: 'image',
    label: 'تصویر',
    helperText: 'PNG، JPG یا WEBP تا ۱ مگابایت',
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    maxFileSize: 1 * 1024 * 1024,
    maxNumberOfFiles: 1,
    accept: 'image/jpeg,image/png,image/webp,image/gif',
    fieldName: 'file',
    errors: {
      type: 'فقط فایل تصویری مجاز است (PNG، JPG، WEBP)',
      size: 'حجم تصویر نباید بیشتر از ۱ مگابایت باشد',
      maxFiles: 'فقط یک تصویر می‌توانید انتخاب کنید',
    },
  },
  excel: {
    id: 'excel',
    label: 'فایل اکسل',
    helperText: 'XLS، XLSX یا CSV تا ۲ مگابایت',
    allowedFileTypes: [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'application/csv',
    ],
    extensions: ['xls', 'xlsx', 'csv'],
    maxFileSize: 2 * 1024 * 1024,
    maxNumberOfFiles: 5,
    accept: '.xls,.xlsx,.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv',
    fieldName: 'file',
    errors: {
      type: 'فقط فایل اکسل یا CSV مجاز است',
      size: 'حجم فایل نباید بیشتر از ۲ مگابایت باشد',
      maxFiles: 'حداکثر ۲ فایل می‌توانید انتخاب کنید',
    },
  },
  document: {
    id: 'document',
    label: 'سند',
    helperText: 'PDF یا Word تا ۵ مگابایت',
    allowedFileTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    extensions: ['pdf', 'doc', 'docx'],
    maxFileSize: 5 * 1024 * 1024,
    maxNumberOfFiles: 3,
    accept: '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fieldName: 'file',
    errors: {
      type: 'فقط PDF یا Word مجاز است',
      size: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد',
      maxFiles: 'حداکثر ۳ فایل می‌توانید انتخاب کنید',
    },
  },
}
