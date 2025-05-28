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
        showSuccessToast('应用数据导入成功')
      }
    }

    reader.onerror = () => {
      showFailToast('应用数据读取失败')
    }

    reader.readAsText(files![0])
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <VanCellGroup inset>
      <VanCell title="自动拉取" center>
        <template #value>
          <VanSwitch v-model="configs.data.value.cloudSyncAutoPull" />
        </template>
      </VanCell>

      <VanCell title="云同步服务商" center is-link>
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
        <VanCell title="Gitee 代码片段 Id" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGiteeGistId" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="Gitee 代码片段 Token" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncGiteeGistToken" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.NETWORK_URL">
        <VanCell title="网络链接" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncNetworkUrl" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-else-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.LOCAL_FILE">
        <VanCell title="本地文件路径" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncLocalFilePath" input-align="right" />
          </template>
        </VanCell>
      </template>

      <template v-else-if="configs.data.value.cloudSyncProvider === CloudSyncProvider.WEBDAV">
        <VanCell title="WebDAV 地址" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavUrl" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="WebDAV 用户名" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavUsername" input-align="right" />
          </template>
        </VanCell>

        <VanCell title="WebDAV 密码" center>
          <template #value>
            <VanField v-model="configs.data.value.cloudSyncWebDavPassword" input-align="right" />
          </template>
        </VanCell>
      </template>

      <VanCell>
        <VanButton type="primary" block @click="configs.update">
          更新
        </VanButton>
      </VanCell>
    </VanCellGroup>

    <VanCellGroup inset>
      <VanCell title="导入应用数据" value="" center is-link @click="importData" />
      <VanCell title="导出应用数据" value="" center is-link @click="exportData" />
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
  title: 云同步
</route>
