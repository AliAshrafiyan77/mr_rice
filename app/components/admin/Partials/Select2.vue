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
})

const emit = defineEmits([
    'update:modelValue',
])

const { get } = useApi()

const usesObjectMode = computed(() => props.mode === 'tags')

function toOptionItem(item) {
    if (typeof item === 'object' && item !== null) {
        const optionValue = item.value ?? item[props.value] ?? item[props.label] ?? item.label
        const optionLabel = item.label ?? item[props.label] ?? String(optionValue ?? '')

        return {
            value: optionValue,
            label: optionLabel,
        }
    }

    return {
        value: item,
        label: String(item),
    }
}

function toInternalValue(value) {
    if (props.mode !== 'tags') {
        return value
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
    if (!usesObjectMode.value) {
        return value
    }

    if (!Array.isArray(value)) {
        return []
    }

    return value.map((item) => {
        if (typeof item === 'object' && item !== null) {
            if (props.emitField === 'value') {
                return item.value
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
        emit('update:modelValue', toExternalValue(newValue))
    },
})

const searchOptions = async (query) => {
    if (!query || query.length < props.minChars) {
        return []
    }

    try {
        const url =
            `${props.url}?${props.searchParam}=${encodeURIComponent(query)}&limit=${props.limit}`

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
