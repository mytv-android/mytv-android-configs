<script setup lang="ts">
import { IptvHybridModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const iptvSourceCacheTimePickerData = [
  { text: '不缓存', value: 0 },
  ...Array.from({ length: 23 }, (_, i) => i + 1).map(it => ({ text: `${it}小时`, value: it * 1000 * 60 * 60 })),
  ...Array.from({ length: 15 }, (_, i) => i + 1).map(it => ({ text: `${it}天`, value: it * 24 * 1000 * 60 * 60 })),
  { text: '永久', value: 9223372036854776000 },
]

const iptvHybridModePickerData = Object.entries(IptvHybridModeLabels).map(it => ({ text: it[1], value: it[0] }))
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="自定义直播源" is-link center to="iptv/iptv-source-list">
      <template #value>
        <div class="flex items-center justify-end gap-2">
          <VanTag v-if="configs.data.value.iptvSourceCurrent?.isLocal" plain type="warning" class="flex-none">
            本地
          </VanTag>
          <VanTag v-else plain type="primary" class="flex-none">
            远程
          </VanTag>

          {{ configs.data.value.iptvSourceCurrent?.name }}
        </div>
      </template>
    </VanCell>

    <VanCell title="直播源缓存时间" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.iptvSourceCacheTime" :columns="iptvSourceCacheTimePickerData">
          <VanField
            :model-value="iptvSourceCacheTimePickerData.find(it => it.value === configs.data.value.iptvSourceCacheTime)?.text ?? `${configs.data.value.iptvSourceCacheTime}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <!-- <VanCell title="频道分组管理" value="" center is-link to="iptv/channel-group" /> -->

    <VanCell title="频道别名" value="" center is-link to="iptv/channel-alias" />

    <VanCell title="相似频道合并" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvSimilarChannelMerge" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="频道图标提供">
          <template #help>
            <div class="flex flex-col gap-1">
              <div>格式：</div>
              <div>{name} - 保持不变</div>
              <div>{name|lowercase} - 小写</div>
              <div>{name|uppercase} - 大写</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.iptvChannelLogoProvider" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="混合模式" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.iptvHybridMode" :columns="iptvHybridModePickerData">
          <VanField :model-value="IptvHybridModeLabels[configs.data.value.iptvHybridMode!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell
      title="收藏频道" :value="`共${configs.data.value.iptvChannelFavoriteList?.value.length}个`" is-link
      to="iptv/favorites"
    />

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        更新
      </VanButton>
    </VanCell>
  </VanCellGroup>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.5;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: 直播源
</route>
