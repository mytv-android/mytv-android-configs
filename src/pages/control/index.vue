<script setup lang="ts">
const configs = useConfigsStore()
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Digital Channel Selection" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelNoSelectEnable" />
      </template>
    </VanCell>

    <VanCell title="Channel List Loop" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelChangeListLoop" />
      </template>
    </VanCell>

    <VanCell title="Cross-group Channel Switching" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelChangeCrossGroup" />
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
  title: Control
</route>
