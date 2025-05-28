<script setup lang="ts">
import { VideoPlayerCoreLabels, VideoPlayerDisplayModeLabels, VideoPlayerRenderModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const videoPlayerCorePickerData = Object.entries(VideoPlayerCoreLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerRenderModePickerData = Object.entries(VideoPlayerRenderModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerDisplayModePickerData = Object.entries(VideoPlayerDisplayModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerLoadTimeoutPickerData = [
  { text: '1秒', value: 1 * 1000 },
  { text: '2秒', value: 2 * 1000 },
  { text: '3秒', value: 3 * 1000 },
  { text: '4秒', value: 4 * 1000 },
  { text: '5秒', value: 5 * 1000 },
  { text: '10秒', value: 10 * 1000 },
  { text: '15秒', value: 15 * 1000 },
  { text: '20秒', value: 20 * 1000 },
  { text: '25秒', value: 25 * 1000 },
  { text: '30秒', value: 30 * 1000 },
  { text: '45秒', value: 45 * 1000 },
  { text: '1分钟', value: 60 * 1000 },
]

const videoPlayerBufferTimePickerData = [
  { text: '0秒', value: 0 * 1000 },
  { text: '1秒', value: 1 * 1000 },
  { text: '2秒', value: 2 * 1000 },
  { text: '3秒', value: 3 * 1000 },
  { text: '4秒', value: 4 * 1000 },
  { text: '5秒', value: 5 * 1000 },
  { text: '6秒', value: 6 * 1000 },
  { text: '7秒', value: 7 * 1000 },
  { text: '8秒', value: 8 * 1000 },
  { text: '9秒', value: 9 * 1000 },
  { text: '10秒', value: 10 * 1000 },
  { text: '15秒', value: 15 * 1000 },
  { text: '20秒', value: 20 * 1000 },
  { text: '25秒', value: 25 * 1000 },
  { text: '30秒', value: 30 * 1000 },
  { text: '45秒', value: 45 * 1000 },
  { text: '1分钟', value: 60 * 1000 },
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="视频播放器内核" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerCore" :columns="videoPlayerCorePickerData">
          <VanField :model-value="VideoPlayerCoreLabels[configs.data.value.videoPlayerCore!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="渲染方式" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerRenderMode" :columns="videoPlayerRenderModePickerData">
          <VanField
            :model-value="VideoPlayerRenderModeLabels[configs.data.value.videoPlayerRenderMode!]" input-align="right"
            readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="全局显示模式" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerDisplayMode" :columns="videoPlayerDisplayModePickerData">
          <VanField
            :model-value="VideoPlayerDisplayModeLabels[configs.data.value.videoPlayerDisplayMode!]"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="加载超时" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerLoadTimeout" :columns="videoPlayerLoadTimeoutPickerData">
          <VanField
            :model-value="videoPlayerLoadTimeoutPickerData.find(it => it.value === configs.data.value.videoPlayerLoadTimeout)?.text ?? `${configs.data.value.videoPlayerLoadTimeout}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="缓存加载时间" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerBufferTime" :columns="videoPlayerBufferTimePickerData">
          <VanField
            :model-value="videoPlayerBufferTimePickerData.find(it => it.value === configs.data.value.videoPlayerBufferTime)?.text ?? `${configs.data.value.videoPlayerLoadTimeout}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="全局ua" center>
      <template #value>
        <VanField v-model="configs.data.value.videoPlayerUserAgent" input-align="right" />
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
        <VanField v-model="configs.data.value.videoPlayerHeaders" input-align="right" type="textarea" autosize />
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
