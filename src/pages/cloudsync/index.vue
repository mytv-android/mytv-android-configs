<script setup lang="ts">
import { CloudSyncProvider, CloudSyncProviderLabels } from '~/apis/app'

const configs = useConfigsStore()

const cloudSyncProviderPickerData = Object.entries(CloudSyncProviderLabels).map(it => ({ text: it[1], value: it[0] }))
</script>

<template>
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

    <VanCell>
      <VanButton type="primary" block @click="configs.update">
        更新
      </VanButton>
    </VanCell>
  </VanCellGroup>
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
