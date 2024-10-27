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
    <VanCell title="应用标识" :value="`${about.applicationId}_${about.flavor}_${about.buildType}`" />
    <VanCell title="应用版本" :value="`${about.versionName}(${about.versionCode})`" />

    <VanCell title="设备名称" :value="about.deviceName" />
    <VanCell title="设备ID" :value="about.deviceId" />
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
  title: 关于
</route>
