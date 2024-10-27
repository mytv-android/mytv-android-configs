<script setup lang="ts">
const configs = useConfigsStore()
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="开机自启" center>
      <template #value>
        <VanSwitch v-model="configs.data.appBootLaunch" />
      </template>
    </VanCell>

    <VanCell title="画中画" center>
      <template #value>
        <VanSwitch v-model="configs.data.appPipEnable" />
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
  title: 应用
</route>
