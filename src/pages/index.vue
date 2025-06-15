<script setup lang="ts">
</script>

<template>
  <div>
    <div class="ml-16px p-20px pt-0 text-32px">
      Live TV
    </div>

    <VanCellGroup inset>
      <VanCell title="General" is-link to="app" />
      <VanCell title="Subscriptions" is-link to="iptv" />
      <VanCell title="EPG" is-link to="epg" />
      <VanCell title="UI" is-link to="ui" />
      <VanCell title="Control" is-link to="control" />
      <VanCell title="Player" is-link to="player" />
      <VanCell title="Update" is-link to="update" />
      <VanCell title="Theme" is-link to="theme" />
      <VanCell title="Cloud Sync" is-link to="cloudsync" />
      <VanCell title="Debug" is-link to="debug" />
      <VanCell title="Log" is-link to="log" />
      <VanCell title="About" is-link to="about" />
    </VanCellGroup>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
