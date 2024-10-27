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
    <VanCell title="主题名称" center>
      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.name" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="背景">
          <template #help>
            <div class="w-410px flex flex-col gap-1">
              <div>示例：</div>
              <div>base64：iVBORw0KGgoAAAANSUhEUg...</div>
              <div>网络链接：http://image.dev/bg.png</div>
              <div>本地文件：file:///storage/emulated/0/Download/bg.png</div>
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
        <CellTitle title="贴图">
          <template #help>
            <div class="w-410px flex flex-col gap-1">
              <div>示例：</div>
              <div>base64：iVBORw0KGgoAAAANSUhEUg...</div>
              <div>网络链接：http://image.dev/bg.png</div>
              <div>本地文件：file:///storage/emulated/0/Download/bg.png</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.texture" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="贴图透明度" center>
      <template #value>
        <VanField v-model="configs.data.value.themeAppCurrent.textureAlpha" type="number" input-align="right" />
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
  flex: 0.5;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 主题
</route>
