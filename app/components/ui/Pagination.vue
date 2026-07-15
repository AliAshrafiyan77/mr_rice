<template>
    <nav
        v-if="paginator && paginator.last_page > 1"
        class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border"
    >
        <p class="text-sm text-muted order-2 sm:order-1">
            نمایش <span class="font-medium text-text">{{ paginator.from }}</span>
            تا <span class="font-medium text-text">{{ paginator.to }}</span>
            از <span class="font-medium text-text">{{ paginator.total }}</span> نتیجه
        </p>

        <div class="flex items-center gap-1 order-1 sm:order-2">
            <button
                :disabled="!paginator.prev_page_url"
                @click="goTo(paginator.current_page - 1)"
                class="p-2 rounded-lg text-muted hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
            >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            <template v-for="(link, index) in numericLinks" :key="index">
                <span v-if="link.label === '...'" class="px-2 text-muted text-sm">…</span>
                <button
                    v-else
                    @click="goTo(Number(link.label))"
                    class="min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium transition-colors"
                    :class="link.active
                        ? 'bg-primary-400 text-white'
                        : 'text-text hover:bg-background'"
                >
                    {{ link.label }}
                </button>
            </template>

            <button
                :disabled="!paginator.next_page_url"
                @click="goTo(paginator.current_page + 1)"
                class="p-2 rounded-lg text-muted hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
            >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5l-7 7 7 7" />
                </svg>
            </button>
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    paginator: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['change-page'])

// Laravel's `links` array includes "&laquo; Previous" and "Next &raquo;" entries — filter those out, keep only page numbers and "..."
const numericLinks = computed(() => {
    if (!props.paginator?.links) return []
    return props.paginator.links.filter(
        (link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;'
    )
})

const goTo = (page) => {
    if (page < 1 || page > props.paginator.last_page || page === props.paginator.current_page) return
    emit('change-page', page)
}
</script>