<script setup lang="ts">
import type { PickerOption } from 'vant'

const { value, columns } = defineProps<{ value: any, columns: PickerOption[] }>()
const emit = defineEmits<{ (e: 'update:value', value: any): void }>()

const showPicker = ref(false)
function onConfirm({ selectedValues }: { selectedValues: any }) {
  emit('update:value', selectedValues[0])
  showPicker.value = false
}
</script>

<template>
  <div @click="showPicker = true">
    <slot :value="value" />
  </div>

  <VanPopup v-model:show="showPicker" round position="bottom">
    <VanPicker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
  </VanPopup>
</template>
