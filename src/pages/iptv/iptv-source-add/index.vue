<script setup lang="ts">
import type { IptvSource } from '~/apis/app'
import { AppApi } from '~/apis/app'

const router = useRouter()
const configs = useConfigsStore()

const iptvSource = ref<IptvSource & {
  type: 'url' | 'file' | 'content' | 'xtream'
  content?: string
}>({
  type: 'url',
  name: '',
  url: '',
  sourceType: 0,
  format: 'm3u_plus',
})

async function addIptvSource() {
  if (iptvSource.value.type === 'file') {
    iptvSource.value.sourceType = 1
  }
  else if (iptvSource.value.type === 'content') {
    iptvSource.value.sourceType = 1
    const path = await AppApi.writeFileContentWithDir('file', `iptv_source_local_${Date.now()}.txt`, iptvSource.value.content!)
    iptvSource.value.url = path
  }
  else if (iptvSource.value.type === 'xtream') {
    iptvSource.value.sourceType = 2
  }

  configs.data.value.iptvSourceList = { value: [...configs.data.value.iptvSourceList?.value ?? [], iptvSource.value] }
  await configs.update()
  router.back()
}
</script>

<template>
  <VanCellGroup v-if="iptvSource" inset>
    <VanCell title="Type" center>
      <template #value>
        <VanRadioGroup v-model="iptvSource.type" direction="horizontal" class="justify-end">
          <VanRadio name="url">
            Remote
          </VanRadio>
          <VanRadio name="file">
            File
          </VanRadio>
          <VanRadio name="content">
            Static
          </VanRadio>
          <VanRadio name="xtream">
            XTREAM
          </VanRadio>
        </VanRadioGroup>
      </template>
    </VanCell>

    <VanCell title="Name" center>
      <template #value>
        <VanField v-model="iptvSource.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url' || iptvSource.type === 'xtream'" title="URL" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url' || iptvSource.type === 'xtream'" title="UA">
      <template #value>
        <VanField v-model="iptvSource.httpUserAgent" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-else-if="iptvSource.type === 'file'" title="File Path" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-else-if="iptvSource.type === 'content'" title="Content">
      <template #value>
        <VanField v-model="iptvSource.content" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'xtream'" title="Username">
      <template #value>
        <VanField v-model="iptvSource.userName" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'xtream'" title="Password">
      <template #value>
        <VanField v-model="iptvSource.password" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'xtream'" title="Output Type">
      <template #value>
        <VanField v-model="iptvSource.format" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell title="Transform JS" center>
      <template #value>
        <VanField v-model="iptvSource.transformJs" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="addIptvSource">
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
  title: Add IPTV Source
</route>
