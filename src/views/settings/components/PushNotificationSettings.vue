<template>
  <div class="mt-4">
    <label for="title">Notification Title</label>
    <div
      class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
    >
      <input
        id="title"
        type="text"
        placeholder="Enter notification title"
        class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
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
        ></textarea>
      </div>
    </div>

    <button
      class="mt-[42px] w-[60%] py-4 bg-primary-500 rounded text-[18px] text-white"
    >
      Push Notification
    </button>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
