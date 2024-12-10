<template>
  <input
    :type="type"
    class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
    :class="`${props.type === 'password' ? '' : ''}`"
    :placeholder="placeholder"
  />
</template>

<script setup>
import { defineComponent, defineProps } from 'vue';

const props = defineProps({
  primary: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
