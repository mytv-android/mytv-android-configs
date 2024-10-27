<script setup lang="ts">
const { title, help } = defineProps<{ title: string, help?: string }>()

const show = ref(false)
</script>

<template>
  <div class="flex items-center gap-1" @click="show = true">
    {{ title }}
    <VanIcon name="info-o" class="op-60" />
  </div>

  <VanDialog v-model:show="show" title="帮助">
    <div class="overflow-x-auto px-8 py-4">
      <slot name="help">
        {{ help }}
      </slot>
    </div>
  </VanDialog>
</template>
