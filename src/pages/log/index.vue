<script setup lang="ts">
import dayjs from 'dayjs'
import type { AppLog } from '~/apis/app'
import { AppApi } from '~/apis/app'

const logs = ref<AppLog[]>([])

onMounted(async () => {
  logs.value = await AppApi.getLogs()
})
</script>

<template>
  <VanCellGroup inset>
    <VanCell v-for="log in logs.reverse()" :key="log.time" :title="`${log.level} | ${log.tag}`" :value="dayjs(log.time).format('HH:mm:ss')">
      <template #label>
        <div class="flex flex-col">
          <div>{{ log.message }}</div>
          <div>{{ log.cause }}</div>
        </div>
      </template>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 3;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 日志
</route>
