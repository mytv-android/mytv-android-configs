<script setup lang="ts">
import { AppApi } from '~/apis/app'

const configs = useConfigsStore()

async function uploadApk(file: { file: File }) {
  await AppApi.uploadApk(file.file)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <VanCellGroup inset>
      <VanCell title="开发者模式" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugDeveloperMode" />
        </template>
      </VanCell>

      <VanCell title="FPS显示" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowFps" />
        </template>
      </VanCell>

      <VanCell title="显示播放器信息" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowVideoPlayerMetadata" />
        </template>
      </VanCell>

      <VanCell title="显示布局网格" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowLayoutGrids" />
        </template>
      </VanCell>

      <VanCell>
        <VanButton type="primary" block @click="configs.update">
          更新
        </VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup inset>
      <VanCell title="上传apk" center>
        <VanUploader :after-read="uploadApk" accept=".apk">
          <VanButton icon="plus" type="primary">
            点击上传
          </VanButton>
        </VanUploader>
      </VanCell>
    </VanCellGroup>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 调试
</route>
