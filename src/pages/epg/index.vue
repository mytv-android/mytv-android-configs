<script setup lang="ts">
const configs = useConfigsStore()

const epgRefreshTimeThresholdPickerData = [
  ...Array.from({ length: 13 }, (_, i) => i).map(it => ({ text: `${it.toString().padStart(2, '0')}:00`, value: it })),
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="节目单启用" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.epgEnable" />
      </template>
    </VanCell>

    <VanCell title="跟随订阅源" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.epgSourceFollowIptv" />
      </template>
    </VanCell>

    <VanCell title="自定义节目单" :value="configs.data.value.epgSourceCurrent?.name" is-link center to="epg/epg-source-list" />

    <VanCell title="刷新时间阈值" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.epgRefreshTimeThreshold" :columns="epgRefreshTimeThresholdPickerData">
          <VanField
            :model-value="epgRefreshTimeThresholdPickerData.find(it => it.value === configs.data.value.epgRefreshTimeThreshold)?.text ?? `${configs.data.value.epgRefreshTimeThreshold}:00`"
            input-align="right" readonly
          />
        </SimplePicker>
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
  title: 节目单
</route>
