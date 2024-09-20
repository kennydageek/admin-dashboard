<template>
  <ea-navbar />

  <div class="mt-[42px]">
    <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
      Staff
    </p>

    <div class="my-4 flex gap-6 justify-between">
      <div
        class="input-container w-[80%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
      >
        <input
          type="text"
          placeholder="Search products by name, price, date"
          class="w-[70%] outline-none py-2 rounded"
        />
        <img src="@/assets/svg/search.svg" class="cursor-pointer w-8" alt="" />
      </div>

      <button
        class="self-center w-[20%] py-4 bg-primary-500 rounded text-[18px] text-white"
        @click="$router.push('/staff/add-staff')"
      >
        Add new staff
      </button>
    </div>

    <div class="my-12">
      <customers-table
        @make-staff-admin="handleShowMakeStaffAdminModal"
        @deactivate-staff="handleShowDeactivateStaffModal"
        @delete-account="handleDeleteStaff"
      />
      <pagination
        class="mt-12"
        :current-page="1"
        :total-records="80"
        :per-page="5"
        @onchange="console.log('kenny')"
      />
    </div>
  </div>

  <ea-modal
    @close-modal="showMakeStaffAdminModal = false"
    :setup="{
      modalActive: showMakeStaffAdminModal,
      modalTitle: 'Become Administration',
      isVerification: false,
    }"
  >
    <p class="text-neutral-700 mb-6">
      You are about to make staff with ID number #AB-001 a super admin, which
      gives complete usage of the dashboard. Kindly use one of the buttons below
    </p>

    <div class="flex justify-between gap-[112px] mt-6">
      <button
        class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
        @click="showMakeStaffAdminModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 w-full px-6 rounded bg-primary-500 text-white"
        @click="showMakeStaffAdminModal = false"
      >
        Make an Admin
      </button>
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showDeactivateStaffModal = false"
    :setup="{
      modalActive: showDeactivateStaffModal,
      modalTitle: 'Deactivate Account',
      isVerification: false,
    }"
  >
    <p class="text-neutral-700 mb-6">
      You are about to deactivate the staff with this ID number #AB-001 account.
      Kindly use one of the buttons below
    </p>

    <div class="flex justify-between gap-[112px] mt-6">
      <button
        class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
        @click="showDeactivateStaffModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 w-full px-6 rounded bg-red-500 text-white"
        @click="showDeactivateStaffModal = false"
      >
        Deactivate
      </button>
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showDeleteStaffModal = false"
    :setup="{
      modalActive: showDeleteStaffModal,
      modalTitle: 'Deactivate Account',
      isVerification: false,
    }"
  >
    <p class="text-neutral-700 mb-6">
      You are about to delete the staff with this ID number #AB-001 account.
      Kindly use one of the buttons below
    </p>

    <div class="flex justify-between gap-[112px] mt-6">
      <button
        class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
        @click="showDeleteStaffModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 w-full px-6 rounded bg-red-500 text-white"
        @click="showDeleteStaffModal = false"
      >
        Delete
      </button>
    </div>
  </ea-modal>
</template>

<script setup>
import CustomersTable from './components/CustomersTable.vue';
import Pagination from '@/components/pagination.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const showMakeStaffAdminModal = ref(false);
const showDeactivateStaffModal = ref(false);
const showDeleteStaffModal = ref(false);

const router = useRouter();
const handleShowMakeStaffAdminModal = (e) => {
  console.log(e);
  showMakeStaffAdminModal.value = !showMakeStaffAdminModal.value;
};

const handleShowDeactivateStaffModal = (e) => {
  showDeactivateStaffModal.value = !showDeactivateStaffModal.value;
};

const handleEditStaff = (e) => {
  console.log(e);
  router.push(`/staff/${e.id}/edit`);
};

const handleDeleteStaff = (e) => {
  showDeleteStaffModal.value = !showDeleteStaffModal.value;
};
</script>

<style lang="scss" scoped></style>
