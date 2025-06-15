<script setup lang="ts">
import { VideoPlayerCoreLabels, VideoPlayerDisplayModeLabels, VideoPlayerRenderModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const videoPlayerCorePickerData = Object.entries(VideoPlayerCoreLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerRenderModePickerData = Object.entries(VideoPlayerRenderModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerDisplayModePickerData = Object.entries(VideoPlayerDisplayModeLabels).map(it => ({ text: it[1], value: it[0] }))

const videoPlayerLoadTimeoutPickerData = [
  { text: '1s', value: 1 * 1000 },
  { text: '2s', value: 2 * 1000 },
  { text: '3s', value: 3 * 1000 },
  { text: '4s', value: 4 * 1000 },
  { text: '5s', value: 5 * 1000 },
  { text: '10s', value: 10 * 1000 },
  { text: '15s', value: 15 * 1000 },
  { text: '20s', value: 20 * 1000 },
  { text: '25s', value: 25 * 1000 },
  { text: '30s', value: 30 * 1000 },
  { text: '45s', value: 45 * 1000 },
  { text: '1min', value: 60 * 1000 },
]

const videoPlayerBufferTimePickerData = [
  { text: '0s', value: 0 * 1000 },
  { text: '1s', value: 1 * 1000 },
  { text: '2s', value: 2 * 1000 },
  { text: '3s', value: 3 * 1000 },
  { text: '4s', value: 4 * 1000 },
  { text: '5s', value: 5 * 1000 },
  { text: '6s', value: 6 * 1000 },
  { text: '7s', value: 7 * 1000 },
  { text: '8s', value: 8 * 1000 },
  { text: '9s', value: 9 * 1000 },
  { text: '10s', value: 10 * 1000 },
  { text: '15s', value: 15 * 1000 },
  { text: '20s', value: 20 * 1000 },
  { text: '25s', value: 25 * 1000 },
  { text: '30s', value: 30 * 1000 },
  { text: '45s', value: 45 * 1000 },
  { text: '1min', value: 60 * 1000 },
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Video Player Core" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerCore" :columns="videoPlayerCorePickerData">
          <VanField :model-value="VideoPlayerCoreLabels[configs.data.value.videoPlayerCore!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Render Mode" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerRenderMode" :columns="videoPlayerRenderModePickerData">
          <VanField
            :model-value="VideoPlayerRenderModeLabels[configs.data.value.videoPlayerRenderMode!]" input-align="right"
            readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Global Display Mode" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerDisplayMode" :columns="videoPlayerDisplayModePickerData">
          <VanField
            :model-value="VideoPlayerDisplayModeLabels[configs.data.value.videoPlayerDisplayMode!]"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Load Timeout" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerLoadTimeout" :columns="videoPlayerLoadTimeoutPickerData">
          <VanField
            :model-value="videoPlayerLoadTimeoutPickerData.find(it => it.value === configs.data.value.videoPlayerLoadTimeout)?.text ?? `${configs.data.value.videoPlayerLoadTimeout}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Buffer Time" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.videoPlayerBufferTime" :columns="videoPlayerBufferTimePickerData">
          <VanField
            :model-value="videoPlayerBufferTimePickerData.find(it => it.value === configs.data.value.videoPlayerBufferTime)?.text ?? `${configs.data.value.videoPlayerLoadTimeout}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Global UA" center>
      <template #value>
        <VanField v-model="configs.data.value.videoPlayerUserAgent" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="Custom Headers">
          <template #help>
            <div class="flex flex-col gap-1">
              <div>Example:</div>
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
        Update
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
  title: Player
</route>
