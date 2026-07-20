<template>
    <div class="relative">
        <button @click="isOpen = !isOpen"
            class="flex items-center gap-2 border border-border bg-surface text-text text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-background transition-colors">
            <svg class="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            فیلترها
            <span v-if="activeCount > 0"
                class="flex items-center justify-center w-5 h-5 rounded-full bg-primary-400 text-white text-xs font-semibold">
                {{ activeCount }}
            </span>
            <svg class="w-4 h-4 text-muted transition-transform duration-200" :class="isOpen ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

    </div>
    <ClientOnly>
        <Teleport to="#filter">

            <Transition enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-4">
                <div v-if="isOpen" class="
                       bg-surface border z-30 border-border rounded-t-2xl lg:rounded-xl shadow-lg
                       w-full max-h-[80vh] lg:max-h-none overflow-y-auto p-4">
                    <div class="flex items-center justify-between mb-4 lg:hidden">
                        <h3 class="text-text font-semibold text-sm">فیلترها</h3>
                        <button @click="isOpen = false" class="p-1.5 rounded-lg text-muted hover:bg-background">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="grid grid-col-span-1 lg:grid-cols-3 gap-2">
                        <slot />
                    </div>

                    <div class="flex items-center gap-2 mt-5 pt-4 border-t border-border">
                        <button @click="apply"
                            class="px-2 bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                            اعمال فیلتر
                        </button>
                        <button @click="reset"
                            class="text-muted text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-background transition-colors">
                            حذف فیلترها
                        </button>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </ClientOnly>


</template>

<script setup>
import { ref } from 'vue'

defineProps({
    activeCount: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['apply', 'reset'])

const isOpen = ref(false)

const apply = () => {
    emit('apply')
    isOpen.value = false
}

const reset = () => {
    emit('reset')
    isOpen.value = false
}
</script>