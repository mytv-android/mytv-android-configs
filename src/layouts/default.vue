<script setup lang="ts">
const router = useRouter()
const route = useRoute()

function onClickLeft() {
  router.back()
}
</script>

<template>
  <VanConfigProvider :theme="isDark ? 'dark' : undefined">
    <VanNavBar :title="route.meta.title" left-text="返回" left-arrow placeholder fixed @click-left="onClickLeft" />
    <div class="py-4">
      <Suspense>
        <RouterView />
      </Suspense>
    </div>
  </VanConfigProvider>
</template>
