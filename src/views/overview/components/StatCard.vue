<template>
  <div class="p-4 bg-white rounded-lg">
    <p class="text-neutral-700 mb-6">{{ item.title }}</p>
    <p class="font-fontHead font-semibold text-[23px] mb-4">
      {{ item.amount }}
    </p>

    <div class="flex gap-10">
      <!-- <div class="p-1 flex gap-1 bg-primary-50 rounded">
        <img src="@/assets/svg/arrow-up-right.svg" alt="" />
        <p class="text-primary-600">{{ item.percIncrease }}</p>
      </div> -->

      <!-- <div class="p-1 flex gap-1 bg-secondary-50 rounded">
        <img src="@/assets/svg/plus.svg" alt="" />
        <p class="text-secondary-600">{{ item.numIncrease }} today</p>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  default: () => {},
});
</script>

<style lang="scss" scoped></style>
