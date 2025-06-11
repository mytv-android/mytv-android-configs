<script setup lang="ts">
const configs = useConfigsStore()
const router = useRouter()

function addIptvSource() {
  router.push('iptv-source-add')
}
</script>

<template>
  <VanCellGroup inset>
    <VanCell
      v-for="source, i in configs.data.value.iptvSourceList?.value" :key="i" :label="source.url"
      is-link center :to="`iptv-source-detail/${i}`"
    >
      <template #title>
        <div class="flex items-center gap-2">
          <span class="text-sm">{{ source.name }}</span>

          <VanTag v-if="source.sourceType === 1" plain type="warning">
            本地
          </VanTag>
          <VanTag v-else-if="source.sourceType === 2" plain type="danger">
            XTREAM
          </VanTag>
          <VanTag v-else plain type="primary">
            远程
          </VanTag>
          <VanTag v-if="source.transformJs" plain type="success">
            转换JS
          </VanTag>
        </div>
      </template>
    </VanCell>

    <VanCell>
      <VanButton type="primary" block @click="addIptvSource">
        添加
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
  title: 自定义订阅源
</route>
