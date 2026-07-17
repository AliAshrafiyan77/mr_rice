<template>
    <ClientOnly>
        <date-picker
            v-model="displayValue"
            format="jYYYY/jMM/jDD"
            display-format="jYYYY/jMM/jDD"
            type="date"
            :placeholder="placeholder"
            input-class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
            color="#8faa63"
        />

        <template #fallback>
            <input
                type="text"
                class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                :placeholder="placeholder"
                disabled
            />
        </template>
    </ClientOnly>
</template>

<script setup>
import { ref, watch } from 'vue'
import DatePicker from 'vue3-persian-datetime-picker'
import moment from 'moment-jalaali'

const props = defineProps({
    modelValue: {
        type: String,
        default: null, // must be Gregorian 'YYYY-MM-DD'
    },
    placeholder: {
        type: String,
        default: 'انتخاب تاریخ',
    },
})

const emit = defineEmits(['update:modelValue'])

const toJalali = (gregorianValue) => {
    if (!gregorianValue) return null

    const parsed = moment(gregorianValue, 'YYYY-MM-DD', true)

    if (!parsed.isValid()) {
        console.warn('JalaliDatePicker: invalid Gregorian date received ->', gregorianValue)
        return null
    }

    return parsed.format('jYYYY/jMM/jDD')
}

const toGregorian = (jalaliValue) => {
    if (!jalaliValue) return null

    // the picker may emit a string, a Date, or a moment-like object depending on version
    const raw = typeof jalaliValue === 'string' ? jalaliValue : String(jalaliValue)

    let parsed = moment(raw, 'jYYYY/jMM/jDD', true)

    if (!parsed.isValid()) {
        parsed = moment(raw, 'jYYYY/jM/jD', true)
    }

    if (!parsed.isValid()) {
        console.warn('JalaliDatePicker: invalid Jalali date received ->', jalaliValue)
        return null
    }

    return parsed.format('YYYY-MM-DD')
}

const displayValue = ref(toJalali(props.modelValue))

// Sync FROM parent (e.g. loading an existing user for edit)
watch(
    () => props.modelValue,
    (newVal) => {
        const jalali = toJalali(newVal)
        if (jalali !== displayValue.value) {
            displayValue.value = jalali
        }
    }
)

// Sync TO parent — this is the actual source of truth now, not @change
watch(displayValue, (newVal) => {
    const gregorian = toGregorian(newVal)
    emit('update:modelValue', gregorian)
})
</script>