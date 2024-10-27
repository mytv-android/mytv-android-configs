<script setup lang="ts">
import { VideoPlayerCoreLabels, VideoPlayerDisplayModeLabels, VideoPlayerRenderModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const videoPlayerCorePickerData = Object.entries(VideoPlayerCoreLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerRenderModePickerData = Object.entries(VideoPlayerRenderModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerDisplayModePickerData = Object.entries(VideoPlayerDisplayModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerLoadTimeoutPickerData = [
  { text: '3秒', value: 3 * 1000 },
  { text: '5秒', value: 5 * 1000 },
  { text: '10秒', value: 10 * 1000 },
  { text: '15秒', value: 15 * 1000 },
  { text: '20秒', value: 20 * 1000 },
  { text: '25秒', value: 25 * 1000 },
  { text: '30秒', value: 30 * 1000 },
  { text: '1分钟', value: 60 * 1000 },
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="内核" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.videoPlayerCore" :columns="videoPlayerCorePickerData">
          <VanField :model-value="VideoPlayerCoreLabels[configs.data.videoPlayerCore!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="渲染方式" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.videoPlayerRenderMode" :columns="videoPlayerRenderModePickerData">
          <VanField
            :model-value="VideoPlayerRenderModeLabels[configs.data.videoPlayerRenderMode!]" input-align="right"
            readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="全局显示模式" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.videoPlayerDisplayMode" :columns="videoPlayerDisplayModePickerData">
          <VanField
            :model-value="VideoPlayerDisplayModeLabels[configs.data.videoPlayerDisplayMode!]"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="加载超时" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.videoPlayerLoadTimeout" :columns="videoPlayerLoadTimeoutPickerData">
          <VanField
            :model-value="videoPlayerLoadTimeoutPickerData.find(it => it.value === configs.data.videoPlayerLoadTimeout)?.text ?? `${configs.data.videoPlayerLoadTimeout}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="自定义ua" center>
      <template #value>
        <VanField v-model="configs.data.videoPlayerUserAgent" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="自定义headers">
          <template #help>
            <div class="flex flex-col gap-1">
              <div>示例：</div>
              <div>Header-Name-1: Header-Value-1</div>
              <div>Header-Name-2: Header-Value-2</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.videoPlayerHeaders" input-align="right" type="textarea" autosize />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        更新
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.6;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 播放器
</route>
