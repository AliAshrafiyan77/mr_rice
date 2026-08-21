<template>
  <li class="cat-tree-node">
    <div class="cat-tree-node__entry">
      <p class="text-sm font-medium text-text">
        {{ category.title }}
      </p>

      <NuxtLink :to="`/admin/categories/${category.id}`"
        type="button"
        class="shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium text-muted border border-border hover:bg-background hover:text-primary-500 transition-colors"
      >
        ویرایش
      </NuxtLink>
    </div>

    <ul v-if="category.children?.length" class="cat-tree">
      <CategoryTreeItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
      />
    </ul>
  </li>
</template>

<script setup>
defineProps({
  category: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.cat-tree {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cat-tree .cat-tree {
  margin-inline-start: 0.75rem;
  padding-inline-start: 1rem;
  border-inline-start: 1px solid black;
}

.cat-tree-node__entry {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  min-height: 2.5rem;
  padding-block: 0.625rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}

.cat-tree-node__entry:hover {
  background-color: color-mix(in srgb, var(--color-background) 60%, transparent);
}

.cat-tree .cat-tree > .cat-tree-node {
  position: relative;
}

.cat-tree .cat-tree > .cat-tree-node > .cat-tree-node__entry::before {
  content: '';
  position: absolute;
  inset-inline-start: -1rem;
  top: 50%;
  width: 1rem;
  height: 1px;
  background-color: black;
}

.cat-tree .cat-tree > .cat-tree-node:last-child::after {
  content: '';
  position: absolute;
  inset-inline-start: -1rem;
  top: 1.25rem;
  bottom: 0;
  width: 1px;
  background-color: var(--color-surface);
  pointer-events: none;
}
</style>
