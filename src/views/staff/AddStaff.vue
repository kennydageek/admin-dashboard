<template>
  <ea-navbar />
  <form class="mt-[42px] p-4 bg-white" @submit.prevent="handleAddStaff">
    <div class="">
      <p class="mb-2 font-fontHead text-xl font-semibold text-neutral-800">
        Staff Info
      </p>
      <p class="text-neutral-700">Fill in the staff details below</p>
    </div>
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          First name
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff first name?"
            v-model="form.firstName"
            required
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Last name</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            v-model="form.lastName"
            required
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- ======= -->
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Email Address
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="email"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff email?"
            v-model="form.email"
            required
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Phone number
        </p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="text"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff phone number?"
            v-model="form.phoneNumber"
            required
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- ldkfkfkf===ddfkdf -->

    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Start date
        </p>

        <div
          class="w-full bg-white border-neutral-400 pr-0 rounded placeholder:text-base border flex"
        >
          <input
            type="date"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff first name?"
            v-model="form.startDate"
            required
          />
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
          Date of Birth
        </p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <input
            type="date"
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            v-model="form.dateOfBirth"
            required
          />
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <!-- 9393939929292 -->
    <div class="flex flex-col md:flex-row md:gap-6 mt-4">
      <div class="mb-4 grow w-full md:w-[50%]">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Gender</p>

        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <select
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder=""
            v-model="form.gender"
          >
            <option>Select the staff gender</option>
            <option value="male">Male</option>
            <option value="female">Femaile</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
          <!-- <img src="@/assets/svg/lock.svg" alt="" /> -->
        </div>
      </div>

      <div class="mb-2 w-full md:w-[50%] grow">
        <p class="text-[18px] font-fontHead text-neutral-800 mb-2">Role</p>
        <div
          class="w-full bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
        >
          <select
            class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
            placeholder="What is the staff last name?"
            v-model="form.staffRole"
            required
          >
            <option value="General Manager">General Manager</option>
            <option value="General Admin">General Admin</option>
            <option value="General Staff">General Staff</option>
            <option value="General Guest">Guest</option>
          </select>
          <!-- <img src="@/assets/svg/arrow_down.svg" alt="" /> -->
        </div>
      </div>
    </div>

    <div class="mt-6">
      <p class="text-xl font-fontHead font-semibold text-neutral-800 mb-2">
        Password
      </p>

      <p class="text-neutral-700">
        Fill in the staff username and password below
      </p>

      <div class="flex flex-col md:flex-row md:gap-6 mt-4">
        <div class="mb-2 w-full md:w-[50%] grow">
          <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
            Password
          </p>
          <div
            class="w-full border-neutral-400 pr-3 rounded placeholder:text-base border flex"
          >
            <input
              type="password"
              placeholder="Enter password"
              class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
              v-model="form.password"
              required
            />
            <img src="@/assets/images/eye-cross.svg" alt="" />
          </div>
        </div>

        <div class="mb-2 w-full md:w-[50%]">
          <p class="text-[18px] font-fontHead text-neutral-800 mb-2">
            Confirm Password
          </p>
          <div
            class="w-full border-neutral-400 pr-3 rounded placeholder:text-base border flex"
          >
            <input
              type="password"
              placeholder="Enter passsword"
              class="w-full block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
              v-model="confirmPassword"
              required
            />

            <img src="@/assets/images/eye-cross.svg" alt="" />
          </div>
        </div>
      </div>
    </div>

    <button
      class="w-full mt-[42px] py-4 bg-primary-500 rounded text-[18px] text-white"
    >
      Add Staff
    </button>
  </form>
</template>

<script setup>
import { StaffService } from '@/services';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast();
const loading = ref(false);
const router = useRouter();

const form = ref({
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  startDate: '',
  dateOfBirth: '',
  password: '',
  staffRole: '',
});
const confirmPassword = ref('');

const handleAddStaff = async () => {
  if (form.value.password !== confirmPassword.value) {
    toast.error('Password and confirm Password not the same');
    return;
  }
  try {
    loading.value = true;
    const payload = {
      ...form.value,
      dateOfBirth: new Date(form.value.dateOfBirth).toISOString().split('T')[0],
      startDate: new Date(form.value.startDate).toISOString().split('T')[0],
    };
    const data = await StaffService.createStaff(payload);
    toast.success(data.message);
    console.log(data);
    loading.value = false;
    router.push('/staff');
  } catch (error) {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
