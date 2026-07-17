<template>
    <div>
        <label v-if="label" class="block text-sm font-medium text-text mb-1.5">
            {{ label }}
        </label>

        <slot />

        <p v-if="error" class="text-danger text-xs mt-1">
            {{ Array.isArray(error) ? error[0] : error }}
        </p>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: '',
    },
    error: {
        type: [Array, String],
        default: null,
    },
})
</script>