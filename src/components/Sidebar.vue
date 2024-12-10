<template>
  <div
    class="fixed h-[100vh] bg-primary-700 py-14 px-4 flex flex-col justify-between text-white overflow-scroll no-scrollbar"
  >
    <div class="top">
      <img src="@/assets/svg/logo.svg" alt="" />

      <div class="mt-6 mb-6">
        <div class="" v-for="(link, i) in generalLinks" :key="link.to">
          <router-link
            :to="{ name: link.to }"
            :class="isActive(link.to) ? 'bg-primary-500' : ''"
            class="mb-4 rounded p-4 flex justify-between"
          >
            <div class="text-[18px]">{{ link.name }}</div>
            <img
              src="@/assets/svg/caret-right.svg
            "
              alt=""
              :class="isActive(link.to) ? 'flex' : 'hidden'"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
// import Accordion from '@/components/Accordion.vue';

const route = useRoute();

const generalLinks = [
  {
    name: 'Overview',
    to: 'overview',
  },

  {
    name: 'Customers',
    to: 'customers',
  },

  {
    name: 'Partners',
    to: 'partners',
  },

  {
    name: 'Categories',
    to: 'categories',
  },

  {
    name: 'Orders',
    to: 'orders',
  },

  {
    name: 'Payment',
    to: 'payments',
  },

  {
    name: 'Blogs',
    to: 'blogs',
  },

  {
    name: 'Staff',
    to: 'staff',
  },

  {
    name: 'Notifications',
    to: 'notifications',
  },
  {
    name: 'Settings',
    to: 'settings',
  },

  {
    name: 'Feedback',
    to: 'feedback',
  },

  // {
  //   name: 'Partner Information',
  //   to: 'partner-information',
  // },
  // {
  //   name: 'Business Information',
  //   to: 'business-information',
  // },
  //   {
  //     name: 'Shipping Information',
  //     to: 'shipping-information',
  //   },
  //   {
  //     name: 'Payment Information',
  //     to: 'payment-information',
  //   },
];

const links = [
  //   {
  //     name: 'Orders',
  //     to: 'orders',
  //   },
  //   {
  //     name: 'Products',
  //     to: 'products',
  //   },
  // {
  //   name: 'Financial Reports',
  //   to: 'financial-reports',
  // },
];

const settingLinks = [
  //   {
  //     name: 'Settings',
  //     to: 'settings',
  //   },
  // {
  //   name: 'Support',
  //   to: 'login',
  // },
];

const isActive = (linkTo) => {
  return route.name === linkTo;
};

const accordionItems = [
  //   { title: 'Order', content: 'Content for Item 1' },
  //   { title: 'Product', content: 'Content for Item 2' },
  //   { title: 'Financial Report', content: 'Content for Item 3' },
];
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
