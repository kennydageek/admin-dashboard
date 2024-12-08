<template>
  <form class="mt-4" @submit.prevent="pushNotification">
    <label for="title">Notification Title</label>
    <div
      class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
    >
      <input
        id="title"
        type="text"
        placeholder="Enter notification title"
        class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
        v-model="form.title"
        required
      />
    </div>

    <div class="mt-4">
      <label for="body">Notification Body</label>
      <div
        class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
      >
        <textarea
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          name=""
          id="body"
          cols="30"
          rows="10"
          placeholder="Enter the notification body"
          v-model="form.body"
          required
        ></textarea>
      </div>
    </div>

    <button
      class="mt-[42px] w-[60%] py-4 bg-primary-500 rounded text-[18px] text-white"
    >
      <ea-spinner small v-if="loading" />
      <p v-else>Push Notification</p>
    </button>
  </form>
</template>

<script setup>
import { NotificationService } from '@/services';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

const form = ref({
  title: '',
  body: '',
});

const toast = useToast();
const loading = ref(false);

const pushNotification = async () => {
  try {
    loading.value = true;

    const data = await NotificationService.pushNotification(form.value);
    toast.success(data.message);
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
