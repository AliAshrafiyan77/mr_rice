<template>
  <div>
    <Header/>
    <slot />
  </div>
</template>
<script setup>
  import Header from '~/components/layout/Header/index.vue';
</script>
