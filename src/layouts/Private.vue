<template>
  <div class="md:flex">
    <sidebar class="w-[19%] self-start hidden md:flex" />
    <!-- <sidebar-mobile class="w-[100%] self-start md:hidden flex" /> -->

    <main
      class="grow px-8 py-[56px] md:px-16 md:ml-[19%] bg-neutral-100 min-h-100"
    >
      <slot />
    </main>
  </div>
</template>

<script setup>
import { defineComponent, defineProps } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
// import SidebarMobile from '@/components/SidebarMobile.vue';
</script>

<style lang="scss" scoped></style>
