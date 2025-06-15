<script setup lang="ts">
const configs = useConfigsStore()

watch(configs, () => {
  if (!configs.data.value.themeAppCurrent) {
    configs.data.value.themeAppCurrent = { name: '', background: '' }
  }
})
</script>

<template>
  <VanCellGroup v-if="configs.data.value.themeAppCurrent" inset>
    <VanCell title="Theme Name" center>
      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="Background">
          <template #help>
            <div class="w-410px flex flex-col gap-1">
              <div>Example:</div>
              <div>base64: iVBORw0KGgoAAAANSUhEUg...</div>
              <div>Network URL: http://image.dev/bg.png</div>
              <div>Local file: file:///storage/emulated/0/Download/bg.png</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.background" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="Texture">
          <template #help>
            <div class="w-410px flex flex-col gap-1">
              <div>Example:</div>
              <div>base64: iVBORw0KGgoAAAANSUhEUg...</div>
              <div>Network URL: http://image.dev/bg.png</div>
              <div>Local file: file:///storage/emulated/0/Download/bg.png</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.texture" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="Texture Alpha" center>
      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.textureAlpha" type="number" input-align="right" />
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
  flex: 0.5;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: Theme
</route>
