<template>
  <span
    class="loader"
    :class="small ? 'w-6 h-6 border-1' : 'w-12 h-12 border-8'"
  ></span>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.loader {
  /* width: 48px;
  height: 48px; */
  border: 4px solid #edefef;
  border-bottom-color: #fbb040;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
