<script setup lang="ts">
import type { EpgSource } from '~/apis/app'

const router = useRouter()
const configs = useConfigsStore()

const epgSource = ref<EpgSource>({
  name: '',
  url: '',
})

async function addEpgSource() {
  configs.data.value.epgSourceList = { value: [...configs.data.value.epgSourceList?.value ?? [], epgSource.value] }
  await configs.update()
  router.back()
}
</script>

<template>
  <VanCellGroup v-if="epgSource" inset>
    <VanCell title="Name" center>
      <template #value>
        <VanField v-model="epgSource.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="URL" center>
      <template #value>
        <VanField v-model="epgSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="addEpgSource">
        Confirm
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
  title: Add EPG Source
</route>
