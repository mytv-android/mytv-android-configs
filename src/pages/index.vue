<script setup lang="ts">
</script>

<template>
  <div>
    <div class="ml-16px p-20px pt-0 text-32px">
      天光云影
    </div>

    <VanCellGroup inset>
      <VanCell title="应用" is-link to="app" />
      <VanCell title="播放源" is-link to="iptv" />
      <VanCell title="节目单" is-link to="epg" />
      <VanCell title="界面" is-link to="ui" />
      <VanCell title="控制" is-link to="control" />
      <VanCell title="播放器" is-link to="player" />
      <VanCell title="更新" is-link to="update" />
      <VanCell title="主题" is-link to="theme" />
      <VanCell title="云同步" is-link to="cloudsync" />
      <VanCell title="调试" is-link to="debug" />
      <VanCell title="日志" is-link to="log" />
      <VanCell title="关于" is-link to="about" />
    </VanCellGroup>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
