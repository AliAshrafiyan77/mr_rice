<script setup>
defineProps({
  provenance: { type: Object, required: true },
  cooking: { type: Object, required: true },
})
</script>

<template>
  <section class="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-16 md:py-12">
    <!-- Mobile: accordions -->
    <div class="flex flex-col gap-2 lg:hidden">
      <details class="group overflow-hidden rounded-xl bg-surface shadow-sm" open>
        <summary class="flex cursor-pointer list-none select-none items-center justify-between p-4">
          <div class="flex items-center gap-2 text-text">
            <UiMaterialIcon name="nature" :size="22" class="text-primary-600" />
            <span class="text-sm font-semibold">{{ provenance.title }}</span>
          </div>
          <UiMaterialIcon
            name="expand_more"
            :size="24"
            class="text-muted transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div class="flex flex-col gap-3 px-4 pb-4 pt-0 text-sm leading-relaxed text-muted">
          <p>{{ provenance.body }}</p>
          <div
            v-if="provenance.accordionHighlight"
            class="flex items-center gap-2 rounded-lg bg-primary-50 p-3 text-xs text-text"
          >
            <UiMaterialIcon name="award_star" :size="18" class="text-secondary-600" />
            <span>{{ provenance.accordionHighlight }}</span>
          </div>
        </div>
      </details>

      <details class="group overflow-hidden rounded-xl bg-surface shadow-sm">
        <summary class="flex cursor-pointer list-none select-none items-center justify-between p-4">
          <div class="flex items-center gap-2 text-text">
            <UiMaterialIcon name="skillet" :size="22" class="text-secondary-600" />
            <span class="text-sm font-semibold">{{ cooking.title }}</span>
          </div>
          <UiMaterialIcon
            name="expand_more"
            :size="24"
            class="text-muted transition-transform duration-200 group-open:rotate-180"
          />
        </summary>
        <div class="flex flex-col gap-4 px-4 pb-4 pt-1">
          <div
            v-for="step in cooking.steps"
            :key="step.number"
            class="flex items-start gap-3"
          >
            <span
              class="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-sm font-bold text-secondary-800"
            >
              {{ step.number }}
            </span>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-text">{{ step.title }}</span>
              <span class="text-xs text-muted">{{ step.description }}</span>
            </div>
          </div>
        </div>
      </details>
    </div>

    <!-- Desktop: bento grid -->
    <div class="hidden grid-cols-12 gap-6 lg:grid">
      <div class="col-span-7 flex flex-col justify-between rounded-xl bg-surface p-6 shadow-sm lg:p-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 text-secondary-800">
            <UiMaterialIcon name="nature_people" :size="20" />
            <span class="text-xs font-semibold uppercase tracking-wider">{{ provenance.sectionLabel }}</span>
          </div>
          <h2 class="text-xl font-medium text-primary-600 md:text-2xl">
            {{ provenance.title }}
          </h2>
          <p class="text-justify text-sm leading-relaxed text-muted md:text-base">
            {{ provenance.body }}
          </p>
          <div class="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
            <div
              v-for="(highlight, i) in provenance.highlights"
              :key="i"
              class="flex items-start gap-2"
            >
              <UiMaterialIcon name="check_circle" :size="20" class="mt-0.5 shrink-0 text-primary-600" />
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-text">{{ highlight.title }}</span>
                <span class="text-xs text-muted">{{ highlight.description }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted"
        >
          <div class="flex items-center gap-1">
            <UiMaterialIcon name="location_on" :size="16" />
            <span>{{ provenance.location }}</span>
          </div>
          <span class="font-mono">{{ provenance.coordinates }}</span>
        </div>
      </div>

      <div class="col-span-5 flex flex-col justify-between rounded-xl bg-primary-50/80 p-6 lg:p-8">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 text-secondary-800">
            <UiMaterialIcon name="menu_book" :size="20" />
            <span class="text-xs font-semibold tracking-wider">{{ cooking.sectionLabel }}</span>
          </div>
          <h3 class="text-xl font-medium text-text md:text-2xl">
            {{ cooking.title }}
          </h3>
          <div class="flex flex-col gap-4">
            <div
              v-for="step in cooking.steps"
              :key="step.number"
              class="flex items-start gap-3"
            >
              <span
                class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white"
              >
                {{ step.number }}
              </span>
              <div class="flex flex-col">
                <span class="text-sm font-semibold text-text">{{ step.title }}</span>
                <p class="text-xs text-muted">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-secondary-800">
          <span class="flex items-center gap-1">
            <UiMaterialIcon name="timer" :size="16" />
            {{ cooking.prepTime }}
          </span>
          <span class="flex items-center gap-1">
            <UiMaterialIcon name="restaurant" :size="16" />
            {{ cooking.servingNote }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
