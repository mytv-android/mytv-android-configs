<script setup lang="ts">
const configs = useConfigsStore()
const router = useRouter()

function addEpgSource() {
  router.push('epg-source-add')
}
</script>

<template>
  <VanCellGroup inset>
    <VanCell
      v-for="source, i in configs.data.value.epgSourceList?.value" :key="i" :title="source.name" :label="source.url"
      is-link center :to="`epg-source-detail/${i}`"
    />

    <VanCell>
      <VanButton type="primary" block @click="addEpgSource">
        Add
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__label) {
  word-break: break-word;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: Custom EPG List
</route>
