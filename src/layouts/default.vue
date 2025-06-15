<script setup lang="ts">
const router = useRouter()
const route = useRoute()

function onClickLeft() {
  router.back()
}
</script>

<template>
  <VanConfigProvider :theme="isDark ? 'dark' : undefined">
    <VanNavBar :title="route.meta.title" left-text="Return" left-arrow placeholder fixed @click-left="onClickLeft" />
    <div class="py-4">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </VanConfigProvider>
</template>
