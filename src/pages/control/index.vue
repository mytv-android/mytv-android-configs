<script setup lang="ts">
const configs = useConfigsStore()
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="数字选台" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelNoSelectEnable" />
      </template>
    </VanCell>

    <VanCell title="换台反转" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelChangeFlip" />
      </template>
    </VanCell>

    <VanCell title="换台列表首尾循环" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvChannelChangeListLoop" />
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
  title: 控制
</route>
