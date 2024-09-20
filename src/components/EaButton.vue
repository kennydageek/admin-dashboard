<template>
  <button
    class="py-4 px-6 rounded w-full font-semibold"
    :class="`${
      type === 'primary'
        ? 'bg-primary-700 text-white'
        : 'bg-secondary-500 text-black'
    }`"
  >
    <slot />
  </button>
</template>

<script setup>
import { defineComponent, defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
});
</script>

<style lang="scss" scoped></style>
