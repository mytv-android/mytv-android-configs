import type { AppConfigs } from '~/apis/app'
import { AppApi } from '~/apis/app'

export function useConfigsStore() {
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
}
