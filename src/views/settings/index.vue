<template>
  <ea-navbar />

  <div class="mt-[42px]">
    <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
      Settings
    </p>

    <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
      <template v-slot:push> <push-notification-settings /> </template>

      <template v-slot:app> <app-settings /> </template>
      <template v-slot:media> <media-upload-settings /> </template>
    </EaTabs>
  </div>
</template>

<script setup>
import EaTabs from '@/components/EaTabs.vue';
import PushNotificationSettings from './components/PushNotificationSettings.vue';
import AppSettings from './components/AppSettings.vue';
import MediaUploadSettings from './components/MediaUploadSettings.vue';
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  {
    title: 'Push Notification Settings',
    name: 'push',
  },
  {
    title: 'App Settings',
    name: 'app',
  },

  {
    title: 'Media Upload',
    name: 'media',
  },
];
</script>

<style lang="scss" scoped></style>
