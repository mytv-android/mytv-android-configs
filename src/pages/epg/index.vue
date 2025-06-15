<script setup lang="ts">
const configs = useConfigsStore()

const epgRefreshTimeThresholdPickerData = [
  ...Array.from({ length: 13 }, (_, i) => i).map(it => ({ text: `${it.toString().padStart(2, '0')}:00`, value: it })),
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="EPG Enable" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.epgEnable" />
      </template>
    </VanCell>

    <VanCell title="Follow Source" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.epgSourceFollowIptv" />
      </template>
    </VanCell>

    <VanCell title="Custom EPG" :value="configs.data.value.epgSourceCurrent?.name" is-link center to="epg/epg-source-list" />

    <VanCell title="Refresh Time Threshold" center is-link>
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
  title: EPG
</route>
