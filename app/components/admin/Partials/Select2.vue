<template>
    <Multiselect
        dir="rtl"
        v-model="internalValue"
        :options="searchOptions"
        :mode="mode"
        :searchable="searchable"
        :create-option="createOption"
        :filter-results="false"
        :resolve-on-load="false"
        :object="usesObjectMode"
        :min-chars="minChars"
        :delay="delay"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :placeholder="placeholder"
        label="label"
        value-prop="value"
        :clear-on-search="clearOnSearch"
    />
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const props = defineProps({
    modelValue: {
        type: [Array, String, Number, Object, null],
        default: null,
    },

    url: {
        type: String,
        required: true,
    },

    label: {
        type: String,
        default: 'name',
    },

    value: {
        type: String,
        default: 'id',
    },

    mode: {
        type: String,
        default: 'single',
    },

    placeholder: {
        type: String,
        default: 'انتخاب کنید',
    },

    searchParam: {
        type: String,
        default: 'search',
    },

    minChars: {
        type: Number,
        default: 1,
    },

    delay: {
        type: Number,
        default: 300,
    },

    limit: {
        type: Number,
        default: 20,
    },

    createOption: {
        type: Boolean,
        default: false,
    },

    closeOnSelect: {
        type: Boolean,
        default: true,
    },

    disabled: {
        type: Boolean,
        default: false,
    },

    clearOnSearch: {
        type: Boolean,
        default: false,
    },

    searchable: {
        type: Boolean,
        default: true,
    },

    responseKey: {
        type: String,
        default: 'keywords',
    },

    emitField: {
        type: String,
        default: 'label',
    },

    extraParams: {
        type: Object,
        default: () => ({}),
    },

    selectedOptions: {
        type: Array,
        default: () => [],
    },

    max: {
        type: Number,
        default: null,
    },
})

const emit = defineEmits([
    'update:modelValue',
    'update:selectedItems',
    'update:selectedItem',
])

const { get } = useApi()

const usesObjectMode = computed(() => props.mode === 'tags' || props.mode === 'single')

function findSelectedOption(item) {
    const rawValue = typeof item === 'object' && item !== null
        ? (item.value ?? item[props.value])
        : item

    return props.selectedOptions.find((option) => {
        const optionValue = option.value ?? option[props.value] ?? option.id

        return String(optionValue) === String(rawValue)
    })
}

function toOptionItem(item) {
    if (typeof item === 'object' && item !== null) {
        const optionValue = item.value ?? item[props.value] ?? item.id ?? item[props.label] ?? item.label
        const optionLabel = item.label ?? item[props.label] ?? item.title ?? String(optionValue ?? '')

        return {
            value: optionValue,
            label: optionLabel,
        }
    }

    const matched = findSelectedOption(item)

    if (matched) {
        return {
            value: matched.value ?? matched[props.value] ?? matched.id,
            label: matched.label ?? matched[props.label] ?? matched.title ?? String(item),
        }
    }

    return {
        value: item,
        label: String(item),
    }
}

function toInternalValue(value) {
    if (props.mode !== 'tags') {
        if (value === null || value === undefined || value === '') {
            return value
        }

        return toOptionItem(value)
    }

    if (!value) {
        return []
    }

    if (Array.isArray(value)) {
        return value.map(toOptionItem)
    }

    if (typeof value === 'object') {
        return Object.entries(value).map(([key, title]) => ({
            value: props.value === 'id' ? (Number(key) || key) : title,
            label: String(title),
        }))
    }

    return [toOptionItem(value)]
}

function toExternalValue(value) {
    if (props.mode === 'single') {
        if (value === null || value === undefined || value === '') {
            return null
        }

        if (typeof value === 'object') {
            const raw = value.value ?? value[props.value] ?? value.id ?? null

            if (raw === null || raw === undefined || raw === '') {
                return null
            }

            const numeric = Number(raw)

            return Number.isNaN(numeric) ? raw : numeric
        }

        const numeric = Number(value)

        return Number.isNaN(numeric) ? value : numeric
    }

    if (props.mode !== 'tags') {
        return value
    }

    if (!Array.isArray(value)) {
        return []
    }

    return value.map((item) => {
        if (typeof item === 'object' && item !== null) {
            if (props.emitField === 'value') {
                const raw = item.value ?? item[props.value] ?? item.id
                const numeric = Number(raw)

                return Number.isNaN(numeric) ? raw : numeric
            }

            return item.label ?? item.value
        }

        return item
    }).filter((item) => item !== null && item !== undefined && item !== '')
}

function shouldNormalizeExternalValue(value) {
    if (props.mode !== 'tags' || !value) {
        return false
    }

    if (!Array.isArray(value) && typeof value === 'object') {
        return true
    }

    if (Array.isArray(value) && value.some((item) => typeof item === 'object' && item !== null)) {
        return true
    }

    return false
}

watch(
    () => props.modelValue,
    (value) => {
        if (!shouldNormalizeExternalValue(value)) {
            return
        }

        emit('update:modelValue', toExternalValue(toInternalValue(value)))
    },
    { immediate: true, deep: true },
)

const internalValue = computed({
    get: () => toInternalValue(props.modelValue),

    set: (newValue) => {
        let nextValue = newValue

        if (props.mode === 'tags' && props.max && Array.isArray(newValue)) {
            nextValue = newValue.slice(0, props.max)
        }

        emit('update:modelValue', toExternalValue(nextValue))

        if (props.mode === 'tags' && Array.isArray(nextValue)) {
            emit('update:selectedItems', nextValue.map((item) => ({
                id: item.value ?? item[props.value],
                label: item.label ?? item[props.label] ?? String(item.value ?? ''),
            })))
        }

        if (props.mode === 'single') {
            if (nextValue && typeof nextValue === 'object') {
                emit('update:selectedItem', {
                    id: nextValue.value ?? nextValue[props.value],
                    label: nextValue.label ?? nextValue[props.label] ?? String(nextValue.value ?? ''),
                })
            } else {
                emit('update:selectedItem', null)
            }
        }
    },
})

const searchOptions = async (query) => {
    if (!query || query.length < props.minChars) {
        return []
    }

    try {
        const params = new URLSearchParams({
            [props.searchParam]: query,
            limit: String(props.limit),
        })

        Object.entries(props.extraParams ?? {}).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.set(key, String(value))
            }
        })

        const url = `${props.url}?${params.toString()}`

        const response = await get(url)
        const data = response?.[props.responseKey] ?? []

        return data.map((item) => ({
            value: item[props.value],
            label: item[props.label],
            original: item,
        }))
    } catch (error) {
        console.error('Select2 search error:', error)

        return []
    }
}
</script>

<style scoped>
:deep(.multiselect) {
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
}

:deep(.multiselect.is-active) {
    border-color: #6366f1;
    box-shadow: none;
}

:deep(.multiselect-placeholder) {
    color: #9ca3af;
}

:deep(.multiselect-tag) {
    border-radius: 0.375rem;
}
</style>
