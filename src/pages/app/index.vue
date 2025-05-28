<script setup lang="ts">
const configs = useConfigsStore()
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="开机自启" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.appBootLaunch" />
      </template>
    </VanCell>

    <VanCell title="打开直接进入直播" center>
      <template #value>
        <VanSwitch
          :model-value="configs.data.value.appStartupScreen === 'Live'"
          @update:model-value="configs.data.value.appStartupScreen = $event ? 'Live' : 'Dashboard'"
        />
      </template>
    </VanCell>

    <VanCell title="画中画" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.appPipEnable" />
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
  title: 通用
</route>
