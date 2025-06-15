<script setup lang="ts">
import { UiTimeShowModeLabels } from '~/apis/app'

const configs = useConfigsStore()

const uiTimeShowModePickerData = Object.entries(UiTimeShowModeLabels).map(it => ({ text: it[1], value: it[0] }))

const uiScreenAutoCloseDelayPickerData = [
  ...Array.from({ length: 6 }, (_, i) => (i + 1) * 5).map(it => ({ text: `${it}s`, value: it * 1000 })),
  { text: 'Never close', value: 9223372036854776000 },
]

const uiDensityScaleRatioPickerData = [
  { text: 'Auto', value: 0 },
  ...Array.from({ length: 16 }, (_, i) => (i + 5) / 10).map(it => ({ text: `×${it}`, value: it })),
]

const uiFontScaleRatioPickerData = [
  ...Array.from({ length: 16 }, (_, i) => (i + 5) / 10).map(it => ({ text: `×${it}`, value: it })),
]
</script>

<template>
  <VanCellGroup inset>
    <VanCell title="Show EPG Progress" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiShowEpgProgrammeProgress" />
      </template>
    </VanCell>

    <VanCell title="Permanent EPG Progress" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiShowEpgProgrammePermanentProgress" />
      </template>
    </VanCell>

    <VanCell title="Show Channel Logo" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiShowChannelLogo" />
      </template>
    </VanCell>

    <VanCell title="Channel Preview" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiShowChannelPreview" />
      </template>
    </VanCell>

    <VanCell title="Classic Channel Panel" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiUseClassicPanelScreen" />
      </template>
    </VanCell>

    <VanCell title="Time Display" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.uiTimeShowMode" :columns="uiTimeShowModePickerData">
          <VanField :model-value="UiTimeShowModeLabels[configs.data.value.uiTimeShowMode!]" input-align="right" readonly />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Auto Close Delay" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.uiScreenAutoCloseDelay" :columns="uiScreenAutoCloseDelayPickerData">
          <VanField
            :model-value="uiScreenAutoCloseDelayPickerData.find(it => it.value === configs.data.value.uiScreenAutoCloseDelay)?.text ?? `${configs.data.value.uiScreenAutoCloseDelay}ms`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="UI Scale Ratio" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.uiDensityScaleRatio" :columns="uiDensityScaleRatioPickerData">
          <VanField
            :model-value="uiDensityScaleRatioPickerData.find(it => it.value === configs.data.value.uiDensityScaleRatio)?.text ?? `×${configs.data.value.uiDensityScaleRatio}`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Font Scale Ratio" center is-link>
      <template #value>
        <SimplePicker v-model:value="configs.data.value.uiFontScaleRatio" :columns="uiFontScaleRatioPickerData">
          <VanField
            :model-value="uiFontScaleRatioPickerData.find(it => it.value === configs.data.value.uiFontScaleRatio)?.text ?? `×${configs.data.value.uiFontScaleRatio}`"
            input-align="right" readonly
          />
        </SimplePicker>
      </template>
    </VanCell>

    <VanCell title="Focus Optimization" center>
      <template #value>
        <VanSwitch v-model="configs.data.value.uiFocusOptimize" />
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
  title: UI
</route>
