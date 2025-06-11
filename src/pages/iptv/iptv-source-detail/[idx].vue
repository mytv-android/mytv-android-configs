<script setup lang="ts">
import type { IptvSource } from '~/apis/app'
import { AppApi } from '~/apis/app'

const router = useRouter()
const route = useRoute()
const configs = useConfigsStore()
const { idx } = route.params as { idx: number }

const iptvSource = computed<IptvSource & { content?: string } | undefined>(() => configs.data.value.iptvSourceList?.value[idx])

watch(iptvSource, async (val) => {
  if (!val)
    return
  if (!val.sourceType === 1)
    return

  val.content = await AppApi.getFileContent(val.url!)
}, { immediate: true })

async function saveIptvSource() {
  if (iptvSource.value?.sourceType === 1) {
    await AppApi.writeFileContent(iptvSource.value.url!, iptvSource.value.content!)
  }

  await configs.update()
  router.back()
}

async function deleteIptvSource() {
  configs.data.value.iptvSourceList?.value.splice(idx, 1)
  await configs.update()
  router.back()
}

async function switchIptvSource() {
  configs.data.value.iptvSourceCurrent = iptvSource.value
  await configs.update()
  router.back()
}
</script>

<template>
  <VanCellGroup v-if="iptvSource" inset>
    <VanCell title="名称" center>
      <template #value>
        <VanField v-model="iptvSource.name" input-align="right" />
      </template>
    </VanCell>

    <template v-if="iptvSource.sourceType === 1">
      <VanCell title="文件路径" center>
        <template #value>
          <VanField v-model="iptvSource.url" input-align="right" />
        </template>
      </VanCell>

      <VanCell title="文件内容">
        <template #value>
          <VanField v-model="iptvSource.content" type="textarea" rows="5" />
        </template>
      </VanCell>
    </template>

    <VanCell v-else title="链接" center>
      <template #value>
        <VanField v-model="iptvSource.url" input-align="right" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.sourceType === 2" title="用户名">
      <template #value>
        <VanField v-model="iptvSource.userName" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.sourceType === 2" title="密码">
      <template #value>
        <VanField v-model="iptvSource.password" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="iptvSource.sourceType === 2" title="输出类型">
      <template #value>
        <VanField v-model="iptvSource.format" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell v-if="!(iptvSource.sourceType === 1)" title="UA">
      <template #value>
        <VanField v-model="iptvSource.httpUserAgent" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell title="转换JS" center>
      <template #value>
        <VanField v-model="iptvSource.transformJs" type="textarea" rows="5" />
      </template>
    </VanCell>

    <VanCell>
      <div class="flex gap-4">
        <VanButton type="danger" block @click="deleteIptvSource">
          删除
        </VanButton>

        <VanButton type="primary" block @click="saveIptvSource">
          更新
        </VanButton>

        <VanButton type="warning" block @click="switchIptvSource">
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
  title: 订阅源详情
</route>
