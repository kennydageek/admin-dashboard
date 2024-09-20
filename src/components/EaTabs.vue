<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  activeTab: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['update:activeTab']);
const currentTab = ref(props.activeTab);

watch(
  () => props.activeTab,
  (newVal) => {
    currentTab.value = newVal;
  }
);

const selectTab = (index) => {
  currentTab.value = index;
  emit('update:activeTab', index);
};
</script>

<template>
  <div>
    <nav
      class="mb-4 flex space-x-8 border-gray-200 overflow-scroll no-scrollbar"
      aria-label="Tabs"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="[
          currentTab === index
            ? 'border-primary-500 text-primary-500'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'whitespace-nowrap py-4 px-1 border-b-2 text-sm',
        ]"
        @click="selectTab(index)"
      >
        {{ tab.title }}
      </button>
    </nav>

    <div class="tab-content">
      <slot :name="tabs[currentTab]?.name"></slot>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Add any specific styles if necessary */
</style>
