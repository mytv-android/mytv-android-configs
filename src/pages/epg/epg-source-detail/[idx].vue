<script setup lang="ts">
import type { EpgSource } from '~/apis/app'

const router = useRouter()
const route = useRoute()
const configs = useConfigsStore()
const { idx } = route.params as { idx: number }

const epgSource = computed<EpgSource | undefined>(() => configs.data.value.epgSourceList?.value[idx])

async function saveEpgSource() {
  await configs.update()
  router.back()
}

async function deleteEpgSource() {
  configs.data.value.epgSourceList?.value.splice(idx, 1)
  await configs.update()
  router.back()
}

async function switchEpgSource() {
  configs.data.value.epgSourceCurrent = epgSource.value
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
      <div class="flex gap-4">
        <VanButton type="danger" block @click="deleteEpgSource">
          删除
        </VanButton>

        <VanButton type="primary" block @click="saveEpgSource">
          更新
        </VanButton>

        <VanButton type="warning" block @click="switchEpgSource">
          切换
        </VanButton>
      </div>
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
  title: 节目单详情
</route>
