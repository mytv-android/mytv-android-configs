<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'

const configs = useConfigsStore()

function remove(i: number) {
  configs.data.iptvChannelFavoriteList?.value.splice(i, 1)
}
</script>

<template>
  <VanCellGroup v-if="configs.data.iptvChannelFavoriteList" inset>
    <VueDraggable v-model="configs.data.iptvChannelFavoriteList!.value" :animation="150">
      <VanCell
        v-for="it, i in configs.data.iptvChannelFavoriteList?.value" :key="i" :title="it.channel.name"
        :label="`${it.iptvSourceName} / ${it.groupName}`" center
      >
        <template #right-icon>
          <VanIcon name="cross" @click="remove(i)" />
        </template>
      </VanCell>
    </VueDraggable>

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
  title: 收藏频道
</route>
