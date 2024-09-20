<template>
  <div class="flex gap-[42px]">
    <div class="bg-[#EDEFEF] w-[45%] py-[56px] pb-[56px] px-16 hidden md:block">
      <img src="@/assets/images/logo.svg" alt="" />

      <div
        class="mt-59 w-[430px] mx-auto py-[56px] gap-[42px] flex flex-col items-center"
      >
        <img src="@/assets/images/basket.svg" alt="" />
        <div class="text-center">
          <h2 class="text-neutral-800 font-semibold text-[23px] mb-4">
            Everything African
          </h2>
          <p class="text-neutral-700">
            {{
              `We're a marketplace where you can discover and enjoy the best dishes
            and flavors. We source high-quality ingredients and products from
            local stores and vendors to bring you the freshest and most
            authentic products possible.`
            }}
          </p>
        </div>

        <ul class="self-start flex flex-col gap-4">
          <li
            class="flex gap-4"
            v-for="(list, i) in checkList"
            :key="`list-${i}`"
          >
            <img src="@/assets/images/check.svg" alt="" class="self-start" />
            <div class="">
              <p class="text-[19px] text-neutral-800 font-semibold">
                {{ list.title }}
              </p>
              <p class="text-neutral-700 mt-1">{{ list.para }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-white md:w-1/2 py-[56px] pb-[56px] md:pr-16 px-[32px]">
      <div
        class="flex gap-[11px] justify-between md:justify-end mb-[56px] md:mb-[100px]"
      >
        <img src="@/assets/images/logo.svg" class="md:hidden" alt="" />

        <div class="flex gap-3">
          <p class="self-center text-[#535F5D]">Not a member?</p>
          <!-- <div class="grow">
            <router-link :to="{ name: 'register' }" class="block w-full">
              <ea-button
                class="bg-primary-500 md:w-[120px] text-white py-4 px-6 rounded"
              >
                Sign up
              </ea-button>
            </router-link>
          </div> -->
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps, ref } from 'vue';
// import EaButton from '@/components/global/EaButton.vue';

// defineComponent({
//   EaButton,
// });

// const props = defineProps({
//   pageComponent: {
//     type: Object,
//     required: true,
//   },
// });

const showLogin = ref(false);

const handleIsLoginPage = (e) => {
  showLogin.value = e;
};

const checkList = [
  {
    title: 'Free and quick sign up',
    para: 'Enter your email address and other information to create an account',
  },
  {
    title: 'Universal payment method',
    para: 'We accept credit or debit, bank transfer is possible, and finally Paypal payment is accepted',
  },

  {
    title: 'African marketplace',
    para: 'Explore our vast selection of African food items',
  },

  {
    title: 'Community for chefs and food enthusiats',
    para: 'Join our vibrant community of food lovers, share recipes and ideas',
  },
];
</script>

<style lang="scss" scoped></style>
