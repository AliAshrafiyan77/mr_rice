<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <NuxtLink to="/admin/roles" class="p-2 rounded-lg text-muted hover:bg-surface transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
      <h1 class="text-xl font-bold text-text">ویرایش نقش</h1>
    </div>

    <!-- Loading state for initial role fetch -->
    <div v-if="pageLoading" class="bg-surface rounded-xl border border-border p-4 md:p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
        <div class="h-10 rounded-lg bg-background animate-pulse" />
        <div class="h-10 rounded-lg bg-background animate-pulse" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
        <div v-for="i in 6" :key="i" class="h-28 rounded-xl bg-background animate-pulse" />
      </div>
    </div>

    <form v-else @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
      <!-- Basic fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
        <FormField label="نام نقش (فارسی)" :error="errors.fa_name">
          <input
            v-model="form.fa_name"
            type="text"
            placeholder="مثلاً مدیر محتوا"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                   focus:outline-none focus:border-primary-400 transition-colors"
            :class="errors.fa_name ? 'border-danger focus:border-danger' : ''"
          />
        </FormField>

        <FormField label="نام سیستمی (انگلیسی)" :error="errors.name">
          <input
            v-model="form.name"
            type="text"
            dir="ltr"
            placeholder="content-editor"
            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                   focus:outline-none focus:border-primary-400 transition-colors"
            :class="errors.name ? 'border-danger focus:border-danger' : ''"
          />
        </FormField>
      </div>

      <!-- Permissions -->
      <div class="mt-8 pt-6 border-t border-border">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-sm font-bold text-text">دسترسی‌ها</h2>
            <p class="text-xs text-muted mt-0.5">
              {{ form.permissions.length }} از {{ permissions.length }} دسترسی انتخاب شده
            </p>
          </div>
          <button
            type="button"
            @click="toggleAll"
            class="text-xs font-medium px-3 py-1.5 rounded-lg border border-border text-muted hover:bg-background transition-colors"
          >
            {{ allSelected ? 'حذف همه' : 'انتخاب همه' }}
          </button>
        </div>

        <p v-if="errors.permissions" class="text-xs text-danger mb-3">
          {{ errors.permissions[0] }}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="(group, groupKey) in groupedPermissions"
            :key="groupKey"
            class="rounded-xl border border-border bg-background overflow-hidden"
          >
            <div class="flex items-center justify-between px-3.5 py-2.5 bg-surface border-b border-border">
              <span class="text-xs font-bold text-text">{{ group.label }}</span>
              <button
                type="button"
                @click="toggleGroup(groupKey)"
                class="text-[11px] font-medium text-primary-500 hover:text-primary-600 transition-colors"
              >
                {{ isGroupSelected(groupKey) ? 'حذف گروه' : 'انتخاب گروه' }}
              </button>
            </div>

            <div class="p-3 space-y-2 max-h-56 overflow-y-auto">
              <label
                v-for="perm in group.items"
                :key="perm.id"
                class="flex items-center gap-2 text-xs text-text cursor-pointer group select-none"
              >
                <input
                  type="checkbox"
                  :value="perm.name"
                  v-model="form.permissions"
                  class="w-4 h-4 rounded border-border text-primary-500 focus:ring-primary-400 focus:ring-offset-0 shrink-0"
                />
                <span class="group-hover:text-primary-500 transition-colors">
                  {{ perm.fa_name ?? perm.name }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-if="generalError" class="mt-4 bg-danger/10 text-danger text-sm rounded-lg px-4 py-3">
        {{ generalError }}
      </div>

      <div class="sticky bottom-1 bg-white/55 flex items-center gap-3 mt-6 pt-4 border-t border-border">
        <button
          type="submit"
          :disabled="submitting"
          class="bg-primary-700 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ submitting ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
        </button>
        <NuxtLink
          to="/admin/roles"
          class="text-muted text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-background transition-colors"
        >
          انصراف
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import FormField from '~/components/ui/FormField.vue'

const { put, get } = useApi()
const router = useRouter()
const route = useRoute()

const roleId = route.params.id

const form = reactive({
  fa_name: '',
  name: '',
  permissions: [],
})

const errors = ref({})
const generalError = ref('')
const submitting = ref(false)
const pageLoading = ref(true)
const permissions = ref([])

// group by `group` key, label from `fa_group`
const groupedPermissions = computed(() => {
  return permissions.value.reduce((acc, perm) => {
    const key = perm.group || 'other'
    if (!acc[key]) {
      acc[key] = { label: perm.fa_group || 'سایر', items: [] }
    }
    acc[key].items.push(perm)
    return acc
  }, {})
})

const allSelected = computed(
  () => permissions.value.length > 0 && form.permissions.length === permissions.value.length
)

function toggleAll() {
  form.permissions = allSelected.value ? [] : permissions.value.map((p) => p.name)
}

function isGroupSelected(groupKey) {
  const names = groupedPermissions.value[groupKey].items.map((p) => p.name)
  return names.length > 0 && names.every((n) => form.permissions.includes(n))
}

function toggleGroup(groupKey) {
  const names = groupedPermissions.value[groupKey].items.map((p) => p.name)
  if (isGroupSelected(groupKey)) {
    form.permissions = form.permissions.filter((n) => !names.includes(n))
  } else {
    form.permissions = [...new Set([...form.permissions, ...names])]
  }
}

const submit = async () => {
  submitting.value = true
  errors.value = {}
  generalError.value = ''

  try {
    const response = await put(`/api/admin/role/${roleId}`, form)
    if (response.status) {
      router.push('/admin/roles')
    }
  } catch (error) {
    const validationErrors = error?.data?.error?.errors
    if (validationErrors) {
      errors.value = validationErrors
    } else {
      generalError.value = 'خطایی رخ داد، لطفا دوباره تلاش کنید'
    }
  } finally {
    submitting.value = false
  }
}

const fetchPermissions = async () => {
  const response = await get('/api/admin/permission')
  if (response.status) {
    permissions.value = response.permissions
  }
}

const fetchRole = async () => {
  const response = await get(`/api/admin/role/${roleId}`)
  if (response.status) {
    form.fa_name = response.role.fa_name
    form.name = response.role.name
    form.permissions = response.role.permissions?.map((p) => p.name) ?? []
  }
}

onMounted(async () => {
  pageLoading.value = true
  try {
    await Promise.all([fetchPermissions(), fetchRole()])
  } finally {
    pageLoading.value = false
  }
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})
</script>