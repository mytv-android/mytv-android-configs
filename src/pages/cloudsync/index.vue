<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { AppApi, CloudSyncProvider, CloudSyncProviderLabels } from '~/apis/app'

const configs = useConfigsStore()

const cloudSyncProviderPickerData = Object.entries(CloudSyncProviderLabels).map(it => ({ text: it[1], value: it[0] }))

async function exportData() {
  const data = await AppApi.getCloudSyncData()

  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${data.syncFrom}-v${data.version}-${data.syncAt}.json`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function importData() {
  const { open, onChange } = useFileDialog({
    accept: '.json',
    multiple: false,
  })
  open()
  onChange((files) => {
    if (!files || !files.length)
      return

    const reader = new FileReader()

    reader.onload = async (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        await AppApi.pushCloudSyncData(JSON.parse(e.target.result as string))
        showSuccessToast('App data imported successfully')
      }
    }

    reader.onerror = () => {
      showFailToast('Failed to read app data')
    }

    reader.readAsText(files![0])
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <VanCellGroup inset>
      <VanCell title="Auto Pull" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.cloudSyncAutoPull" />
        </template>
      </VanCell>

      <VanCell title="Cloud Sync Provider" center is-link>
        <template #value>
          <SimplePicker v-model:value="configs.data.value.cloudSyncProvider" :columns="cloudSyncProviderPickerData">
            <VanField
              :model-value="CloudSyncProviderLabels[configs.data.value.cloudSyncProvider!]" input-align="right"
              readonly
            />
          </SimplePicker>
        </template>
      </VanCell>

      <template v-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.GITHUB_GIST">
        <VanCell title="Github Gist Id" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGithubGistId" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="Github Gist Token" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGithubGistToken" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.GITEE_GIST">
        <VanCell title="Gitee Gist Id" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGiteeGistId" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="Gitee Gist Token" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGiteeGistToken" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.NETWORK_URL">
        <VanCell title="Network URL" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncNetworkUrl" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-else-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.LOCAL_FILE">
        <VanCell title="Local File Path" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncLocalFilePath" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-else-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.WEBDAV">
        <VanCell title="WebDAV URL" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavUrl" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="WebDAV Username" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavUsername" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="WebDAV Password" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavPassword" input-align="right" />
          </template>
        </VanCell>
      </template>

      <VanCell>
        <VanButton type="primary" block @click="configs.update">
          Update
        </VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup inset>
      <VanCell title="Import App Data" value="" center is-link @click="importData" />
      <VanCell title="Export App Data" value="" center is-link @click="exportData" />
    </VanCellGroup>
  </div>
</template>

<style scoped>
:deep(.van-cell__title) {
  flex: 0.6;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: Cloud Sync
</route>
