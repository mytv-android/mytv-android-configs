<script setup lang="ts">
import type { EpgSource } from '~/apis/app'

const router = useRouter()
const configs = useConfigsStore()

const epgSource = ref<EpgSource>({
  name: '',
  url: '',
})

async function addEpgSource() {
  configs.data.epgSourceList = { value: [...configs.data.epgSourceList?.value ?? [], epgSource.value] }
  await configs.update()
  router.back()
}
</script>

<template>
  <VanCellGroup v-if="epgSource" inset>
    <VanCell title="名称" center>
      <template #value>
        <VanField v-model="epgSource.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="链接" center>
      <template #value>
        <VanField v-model="epgSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="addEpgSource">
        确认
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.2;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 添加节目单
</route>
