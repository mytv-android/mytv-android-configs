<script setup lang="ts">
import type { IptvSource } from '~/apis/app'
import { AppApi } from '~/apis/app'

const router = useRouter()
const configs = useConfigsStore()

const iptvSource = ref<IptvSource & {
  type: 'url' | 'file' | 'content'
  content?: string
}>({
  type: 'url',
  name: '',
  url: '',
  isLocal: false,
})

async function addIptvSource() {
  if (iptvSource.value.type === 'file') {
    iptvSource.value.isLocal = true
  }
  else if (iptvSource.value.type === 'content') {
    iptvSource.value.isLocal = true
    const path = await AppApi.writeFileContentWithDir('file', `iptv_source_local_${Date.now()}.txt`, iptvSource.value.content!)
    iptvSource.value.url = path
  }

  configs.data.value.iptvSourceList = { value: [...configs.data.value.iptvSourceList?.value ?? [], iptvSource.value] }
  await configs.update()
  router.back()
}
</script>

<template>
  <VanCellGroup v-if="iptvSource" inset>
    <VanCell title="类型" center>
      <template #value>
        <VanRadioGroup v-model="iptvSource.type" direction="horizontal" class="justify-end">
          <VanRadio name="url">
            远程
          </VanRadio>
          <VanRadio name="file">
            文件
          </VanRadio>
          <VanRadio name="content">
            静态
          </VanRadio>
        </VanRadioGroup>
      </template>
    </VanCell>

    <VanCell title="名称" center>
      <template #value>
        <VanField v-model="iptvSource.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url'" title="链接" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url'" title="UA">
      <template #value>
        <VanField v-model="iptvSource.httpUserAgent" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-else-if="iptvSource.type === 'file'" title="文件路径" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-else-if="iptvSource.type === 'content'" title="内容">
      <template #value>
        <VanField v-model="iptvSource.content" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell title="转换JS" center>
      <template #value>
        <VanField v-model="iptvSource.transformJs" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="addIptvSource">
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
  title: 添加订阅源
</route>
