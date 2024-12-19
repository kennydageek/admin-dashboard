<template>
  <div class="mb-6">
    <p class="text-[28px] md:text-[39px] font-semibold">Login</p>
    <p class="text-[#535F5D]">
      Enter the email and password you used to register
    </p>
  </div>

  <div class="mt-[42px]">
    <div class="mb-4">
      <p class="text-[18px] text-neutral-800 mb-2">Email</p>
      <div
        class="w-full border-neutral-400 pr-3 rounded placeholder:text-base border flex"
      >
        <input
          type="email"
          placeholder="Enter your email"
          v-model="form.email"
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
        />
      </div>
    </div>
    <div class="mb-2">
      <p class="text-[18px] text-neutral-800 mb-2">Password</p>
      <div
        class="w-full border-neutral-400 pr-3 rounded placeholder:text-base border flex"
      >
        <input
          :type="type"
          placeholder="Enter your password"
          v-model="form.password"
          class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
        />
        <img
          src="@/assets/images/eye-cross.svg"
          @click="handleShowPassword"
          alt=""
          class="cursor-pointer"
        />
      </div>
    </div>

    <div class="mt-[42px]">
      <div class="block mb-4">
        <ea-button
          @click="handleLogin"
          :disabled="form.email === '' || form.password === ''"
        >
          <div class="" v-if="!isLoading">Login</div>
          <ea-spinner small v-else />
        </ea-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, ref } from 'vue';
import EaButton from '@/components/EaButton.vue';
// import { AuthService } from '@/services';
import { AuthService } from '@/services';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';

import { useToast } from 'vue-toastification';

const emit = defineEmits(['loginPage']);
const authStore = useAuthStore();
const showModal = ref(false);
const router = useRouter();
const isLoading = ref(false);
const toast = useToast();

const form = ref({
  email: '',
  password: '',
});

const cityArray = ref([
  {
    id: 1,
    text: 'Lagos',
    selected: false,
  },
  {
    id: 2,
    text: 'Osogbo',
    selected: false,
  },
]);

const type = ref('password');

const handleShowPassword = () => {
  type.value === 'password' ? (type.value = 'text') : (type.value = 'password');
};

const handleSelectedCity = (city) => {
  cityArray.value.forEach((c) => {
    c.selected = c.id === city.id;
  });
  console.log(cityArray.value);
};

// const handleLogin = () => {
//   const payload = {};
//   const { data } = AuthService.login();
//   // router.push({ name: 'seller-register4' });
// };

onMounted(() => {
  emit('loginPage', true);
});

const handleLogin = async () => {
  console.log(form.value);
  try {
    isLoading.value = true;
    const data = await AuthService.login(form.value);
    localStorage.setItem('access_token', data.access_token);
    AuthService.authenticateUser(data.access_token);
    authStore.SET_USER_DATA(data);
    console.log(authStore.SET_USER_DATA);
    router.push({ name: 'overview' });
    toast.success(data.responseMessage);
    console.log(data);
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    isLoading.value = false;
    toast.error(error.message);
  }
};
</script>

<style lang="scss" scoped></style>
