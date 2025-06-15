<script setup lang="ts">
const configs = useConfigsStore()

const updateChannelPickerData = [
  { text: 'Stable', value: 'stable' },
  { text: 'Beta', value: 'beta' },
  { text: 'Dev', value: 'dev' },
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Update Channel" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.updateChannel" :columns="updateChannelPickerData">
          <VanField
            :model-value="updateChannelPickerData.find(it => it.value === configs.data.value.updateChannel)?.text ?? `${configs.data.value.updateChannel}`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Force Update Reminder" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.updateForceRemind" />
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        Update
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<route lang="yaml">
meta:
  layout: default
  title: Update
</route>
