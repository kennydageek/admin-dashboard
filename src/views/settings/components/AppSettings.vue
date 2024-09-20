<template>
  <div class="mt-4">
    <div class="mt-4">
      <label for="android-text" class="text-xl font-fontHead text-neutral-800"
        >App Version Android Text</label
      >
      <div
        class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
      >
        <textarea
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          name=""
          id="android-text"
          cols="30"
          rows="10"
          placeholder="Enter text"
        ></textarea>
      </div>
    </div>

    <div class="mt-4">
      <label for="btn-link" class="text-xl font-fontHead text-neutral-800"
        >App Version Button Link</label
      >
      <div
        class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
      >
        <textarea
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          name=""
          id="btn-link"
          cols="30"
          rows="10"
          placeholder="Enter text"
        ></textarea>
      </div>
    </div>

    <div class="mt-4">
      <label for="header-text" class="text-xl font-fontHead text-neutral-800"
        >App Version Header Text</label
      >
      <div
        class="w-[60%] border-neutral-400 pr-0 rounded placeholder:text-base border flex mt-2"
      >
        <textarea
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          name=""
          id="header-text"
          cols="30"
          rows="10"
          placeholder="Enter text"
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
