<template>
  <div class="relative">
    <div class="p-4 flex justify-between bg-white rounded-lg">
      <div class="">
        <p class="font-fontHead text-xl font-semibold mb-2">Welcome Admin</p>
        <p class="text-neutral-700">
          Here’s what’s happening with Everything African today.
        </p>
      </div>
      <div
        class="flex gap-2 self-center cursor-pointer"
        @click="showMod = !showMod"
      >
        <img src="@/assets/svg/user-icon.svg" alt="" />
        <img src="@/assets/svg/arrow-box-down.svg" alt="" />
      </div>
    </div>
    <div
      class="absolute shadow-sm flex right-0 bg-white w-[180px] rounded-bl-lg rounded-r-lg flex-col items-center py-6 px-4"
      v-if="showMod"
      v-click-away="onClickAway"
    >
      <div>
        <img src="@/assets/svg/logo-green.svg" alt="" />
      </div>
      <p class="mt-4 text-[18px] text-neutral-700">Admin EA</p>

      <p class="mt-6 text-[18px] text-red-500">Sign out</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showMod = ref(false);

const onClickAway = (event) => {
  showMod.value = false;
};
</script>

<style lang="css" scoped></style>
