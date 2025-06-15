<script setup lang="ts">
const configs = useConfigsStore()
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Boot Launch" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.appBootLaunch" />
      </template>
    </VanCell>

    <VanCell title="Start Directly in Live" center>
      <template #value>
        <VanSwitch
          :model-value="configs.data.value.appStartupScreen === 'Live'"
          @update:model-value="configs.data.value.appStartupScreen = $event ? 'Live' : 'Dashboard'"
        />
      </template>
    </VanCell>

    <VanCell title="Picture-in-Picture" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.appPipEnable" />
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
  title: General
</route>
