<script setup lang="ts">
import { AppApi } from '~/apis/app'

const configs = useConfigsStore()

async function uploadApk() {
  const { open, onChange } = useFileDialog({
    accept: '.apk',
    multiple: false,
  })
  open()
  onChange(async (files) => {
    if (!files || !files.length)
      return

    await AppApi.uploadApk(files![0])
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <VanCellGroup inset>
      <VanCell title="Developer Mode" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugDeveloperMode" />
        </template>
      </VanCell>

      <VanCell title="Show FPS" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowFps" />
        </template>
      </VanCell>

      <VanCell title="Show Player Info" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowVideoPlayerMetadata" />
        </template>
      </VanCell>

      <VanCell title="Show Layout Grids" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.debugShowLayoutGrids" />
        </template>
      </VanCell>

      <VanCell>
        <VanButton type="primary" block @click="configs.update">
          Update
        </VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup inset>
      <VanCell title="Upload APK" value="" center is-link @click="uploadApk" />
    </VanCellGroup>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: Debug
</route>
