<script setup lang="ts">
import { showFailToast } from 'vant'
import { AppApi } from '~/apis/app'

const channelAlias = ref<string>()
const channelAliasExample = JSON.stringify({
  __suffix: ['-HighBitrate', '-HD'],
  CCTV1: ['CCTV1HD', 'CCTV1 HD'],
}, null, 2)

onMounted(async () => {
  channelAlias.value = await AppApi.getChannelAlias()
})

async function save() {
  try {
    channelAlias.value = JSON.stringify(JSON.parse(channelAlias.value!), null, 2)
    await AppApi.changeChannelAlias(channelAlias.value!)
  }
  catch (ex: unknown) {
    console.error(ex)
    showFailToast({ message: 'Channel alias format error' })
  }
}
</script>

<template>
  <VanCellGroup inset>
    <VanCell>
      <VanField v-model="channelAlias" :placeholder="channelAliasExample" type="textarea" autosize />
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="save">
        Confirm
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.2;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: Channel Alias
</route>
