<script setup lang="ts">
import { IptvHybridModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const iptvSourceCacheTimePickerData = [
  { text: 'No Cache', value: 0 },
  ...Array.from({ length: 23 }, (_, i) => i + 1).map(it => ({ text: `${it} hour${it > 1 ? 's' : ''}`, value: it * 1000 * 60 * 60 })),
  ...Array.from({ length: 15 }, (_, i) => i + 1).map(it => ({ text: `${it} day${it > 1 ? 's' : ''}`, value: it * 24 * 1000 * 60 * 60 })),
  { text: 'Permanent', value: 9223372036854776000 },
]

const iptvHybridModePickerData = Object.entries(IptvHybridModeLabels).map(it => ({ text: it[1], value: it[0] }))
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Custom Subscription Source" is-link center to="iptv/iptv-source-list">
      <template #value>
        <div class="flex items-center justify-end gap-2">
          <VanTag v-if="configs.data.value.iptvSourceCurrent?.sourceType === 1" plain type="warning" class="flex-none">
            Local
          </VanTag>
          <VanTag v-else-if="configs.data.value.iptvSourceCurrent?.sourceType === 2" plain type="danger" class="flex-none">
            XTREAM
          </VanTag>
          <VanTag v-else plain type="primary" class="flex-none">
            Remote
          </VanTag>
          {{ configs.data.value.iptvSourceCurrent?.name }}
        </div>
      </template>
    </VanCell>

    <VanCell title="Source Cache Time" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.iptvSourceCacheTime" :columns="iptvSourceCacheTimePickerData">
          <VanField
            :model-value="iptvSourceCacheTimePickerData.find(it => it.value === configs.data.value.iptvSourceCacheTime)?.text ?? `${configs.data.value.iptvSourceCacheTime}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <!-- <VanCell title="Channel Group Management" value="" center is-link to="iptv/channel-group" /> -->

    <VanCell title="Channel Alias" value="" center is-link to="iptv/channel-alias" />

    <VanCell title="Merge Similar Channels" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.iptvSimilarChannelMerge" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="Channel Logo Provider">
          <template #help>
            <div class="flex flex-col gap-1">
              <div>Format:</div>
              <div>{name} - Keep unchanged</div>
              <div>{name|lowercase} - Lowercase</div>
              <div>{name|uppercase} - Uppercase</div>
            </div>
          </template>
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.iptvChannelLogoProvider" input-align="right" />
      </template>
    </VanCell>

    <VanCell center>
      <template #title>
        <CellTitle title="Web Source Yangshipin Cookie">
        </CellTitle>
      </template>

      <template #value>
        <VanField v-model="configs.data.value.iptvHybridYangshipinCookie" input-align="right" />
      </template>
    </VanCell>

    <VanCell title="Auto Add Web Source" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.iptvHybridMode" :columns="iptvHybridModePickerData">
          <VanField :model-value="IptvHybridModeLabels[configs.data.value.iptvHybridMode!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell
      title="Favorite Channels" :value="`Total ${configs.data.value.iptvChannelFavoriteList?.value.length}`" is-link
      to="iptv/favorites"
    />

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        Update
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
  title: Subscription Source
</route>
