<script setup lang="ts">
const configs = useConfigsStore()

const updateChannelPickerData = [
  { text: '稳定版', value: 'stable' },
  { text: '测试版', value: 'beta' },
  { text: '开发版', value: 'dev' },
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="更新通道" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.updateChannel" :columns="updateChannelPickerData">
          <VanField
            :model-value="updateChannelPickerData.find(it => it.value === configs.data.value.updateChannel)?.text ?? `${configs.data.value.updateChannel}`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="更新强提醒" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.updateForceRemind" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        更新
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<route lang="yaml">
meta:
  layout: default
  title: 更新
</route>
