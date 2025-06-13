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
          <VanRadio name="xtream">
            XTREAM
          </VanRadio>
        </VanRadioGroup>
      </template>
    </VanCell>

    <VanCell title="名称" center>
      <template #value>
        <VanField v-model="iptvSource.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url' || iptvSource.type === 'xtream'" title="链接" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'url' || iptvSource.type === 'xtream'" title="UA">
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

    <VanCell v-if="iptvSource.type === 'xtream'" title="用户名">
      <template #value>
        <VanField v-model="iptvSource.userName" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'xtream'" title="密码">
      <template #value>
        <VanField v-model="iptvSource.password" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.type === 'xtream'" title="输出类型">
      <template #value>
        <VanField v-model="iptvSource.format" type="textarea" rows="5" />
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
