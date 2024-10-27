import { acceptHMRUpdate, defineStore } from 'pinia'
import type { AppConfigs } from '~/apis/app'
import { AppApi } from '~/apis/app'

export const useConfigsStore = defineStore('configs', () => {
  const data = ref<AppConfigs>({})

  async function refresh() {
    data.value = await AppApi.getConfigs()
  }

  async function update() {
    await AppApi.changeConfig(data.value)
    await refresh()
  }

  onMounted(() => {
    refresh()
  })

  return {
    data,
    refresh,
    update,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
