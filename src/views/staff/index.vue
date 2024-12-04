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
          placeholder="Search staffs by name"
          class="w-[70%] outline-none py-2 rounded"
          v-model="searchInput"
        />
        <img
          src="@/assets/svg/search.svg"
          class="cursor-pointer w-8"
          alt=""
          @click="handleSearchStaff"
        />
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
        :staff-data="allStaffData"
        :is-loading="isLoading"
        @make-staff-admin="handleShowMakeStaffAdminModal"
        @deactivate-staff="handleShowDeactivateStaffModal"
        @delete-account="handleDeleteStaff"
        @edit-staff="handleEditStaff"
      />
      <pagination
        class="mt-12"
        :current-page="currentPage"
        :total-records="totalPages"
        :per-page="itemsPerPage"
        @onchange="handlePageChange"
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
      You are about to deactivate {{ selectedStaff.firstName }}
      {{ selectedStaff.lastName }}
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
        @click="handleDeactivateStaff"
      >
        <ea-spinner small v-if="loading" />
        <p v-if="loading === false">Deactivate</p>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { http } from '@/http/index.js';
import { StaffService } from '@/services';
import { useToast } from 'vue-toastification';
import Spinner from '@/components/EaSpinner.vue';

const searchInput = ref('');
const showMakeStaffAdminModal = ref(false);
const showDeactivateStaffModal = ref(false);
const showDeleteStaffModal = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const totalPages = ref(0);
const allStaffData = ref([]);
const isLoading = ref(false);
const loading = ref(false);
const toast = useToast();

const router = useRouter();

// Fetch all recipes
// const { data: allStaffData, isLoading } = useQuery({
//   queryKey: ['allStaffs', currentPage, itemsPerPage],
//   queryFn: async () => {
//     const response = await http.get('/admin/getAllStaff', {
//       params: {
//         page: currentPage.value,
//         limit: itemsPerPage.value,
//       },
//     });
//     totalPages.value = response.data.total;
//     itemsPerPage.value = response.data.limit;
//     currentPage.value = response.data.page;
//     console.log(totalPages.value, itemsPerPage.value);
//     return response.data.admin;
//   },
//   keepPreviousData: true,
//   onError: (error) => {
//     console.error('Error fetching staff data:', error);
//     toast.error('Error fetching staffs data.');
//   },
// });

const selectedStaff = ref({});

const fetchStaff = async () => {
  isLoading.value = true;
  const data = await StaffService.getStaff({ page: currentPage.value });
  console.log(data);
  allStaffData.value = data.admin;
  totalPages.value = data.total;
  itemsPerPage.value = data.limit;
  isLoading.value = false;
};

onMounted(async () => {
  await fetchStaff();
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleShowMakeStaffAdminModal = (e) => {
  console.log(e);
  showMakeStaffAdminModal.value = !showMakeStaffAdminModal.value;
};

const handleShowDeactivateStaffModal = (e) => {
  selectedStaff.value = e;
  showDeactivateStaffModal.value = !showDeactivateStaffModal.value;
};

const handleEditStaff = (e) => {
  console.log(e);
  router.push(`/staff/${e._id}/edit`);
};

const handleSearchStaff = async () => {
  isLoading.value = true;
  const data = await StaffService.searchStaff({ name: searchInput.value });
  allStaffData.value = data.users;
  totalPages.value = data.total;
  itemsPerPage.value = data.limit;
  console.log(data);
  isLoading.value = false;
};

const handleDeactivateStaff = async () => {
  try {
    const payload = {
      staffId: selectedStaff.value._id,
    };
    console.log(payload);
    loading.value = true;
    const data = await StaffService.deactivateStaff(payload);
    toast.success(data.success);
    showDeactivateStaffModal.value = false;
    await fetchStaff();
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
