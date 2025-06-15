<script setup lang="ts">
import type { AppAbout } from '~/apis/app'
import { AppApi } from '~/apis/app'

const about = ref<AppAbout>()

onMounted(async () => {
  about.value = await AppApi.getAbout()
})
</script>

<template>
  <VanCellGroup v-if="about" inset>
    <VanCell title="App ID" :value="`${about.applicationId}_${about.flavor}_${about.buildType}`" />
    <VanCell title="App Version" :value="`${about.versionName}(${about.versionCode})`" />

    <VanCell title="Device Name" :value="about.deviceName" />
    <VanCell title="Device ID" :value="about.deviceId" />
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.5;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: About
</route>
