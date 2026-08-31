<template>
    <Multiselect
        dir="rtl"
        v-model="value"
        :options="searchOptions"
        :mode="mode"
        :searchable="searchable"
        :create-option="createOption"
        :filter-results="false"
        :resolve-on-load="false"
        :min-chars="minChars"
        :delay="delay"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :placeholder="placeholder"
        :label="'label'"
        :value-prop="'value'"
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
})

const emit = defineEmits([
    'update:modelValue',
])

const { get } = useApi()

const value = computed({
    get: () => props.modelValue,

    set: (newValue) => {
        emit('update:modelValue', newValue)
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

        console.log('API response:', response)

        const data = response?.keywords ?? []

        return data.map((item) => ({
            value: item[props.value],
            label: item[props.label],
            original: item,
        }))

    } catch (error) {

        console.error('RemoteMultiselect error:', error)

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