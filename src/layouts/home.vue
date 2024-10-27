<script setup lang="ts">
</script>

<template>
  <VanConfigProvider :theme="isDark ? 'dark' : undefined" py-10>
    <RouterView />
  </VanConfigProvider>
</template>
