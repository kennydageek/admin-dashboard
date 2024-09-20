<template>
  <ea-navbar />

  <div class="my-[42px] relative">
    <button
      class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
      @click="showDateModal = true"
    >
      <p>{{ dateFilterValue || 'Filter By Date' }}</p>
      <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
    </button>

    <div
      class="absolute shadow-sm flex top-0 left-[210px] bg-white w-[284px] rounded-bl-lg rounded-r-lg flex-col py-6 px-4"
      v-show="showDateModal"
      v-click-away="() => (showDateModal = false)"
    >
      <div v-for="(date, i) in dateArray" :key="`date-range-${i}`" class="p-4">
        <p
          class="text-[18px] cursor-pointer"
          @click="handleSelectDateFilter(date)"
        >
          {{ date.text }}
        </p>
      </div>
    </div>
  </div>

  <div class="mb-[42px] grid gap-6 grid-cols-12">
    <stat-card
      class="col-span-3"
      v-for="(card, i) in statCardArray"
      :key="`stat-card-${i}`"
      :item="card"
    />
  </div>

  <div class="mb-[42px] grid gap-6 grid-cols-12">
    <div class="col-span-4 bg-white p-6 rounded">
      <div class="flex justify-between">
        <div>
          <p class="text-[18px] font-semibold mb-0.5">Sales Progress</p>
          <p class="text-sm text-neutral-700">This quarter</p>
        </div>
        <img src="@/assets/svg/dots-vertical.svg" class="self-start" alt="" />
      </div>
      <div class="">
        <arc />

        <div class="-mt-8 mb-4">
          <p class="text-neutral-700 text-sm text-center">
            You succeed earn
            <span class="text-neutral-800 font-semibold">$240</span> today, its
            higher than yesterday
          </p>
        </div>

        <div class="flex justify-center gap-[18px]">
          <div class="">
            <p class="mb-1">Revenue</p>
            <div class="text-[23px] font-semibold flex gap-1">
              <p class="font-fontHead">$16k</p>
              <img src="@/assets/svg/arrow-up.svg" alt="" />
            </div>
          </div>
          <div class="">
            <p class="mb-1">Today</p>
            <div class="text-[23px] font-semibold flex gap-1">
              <p class="font-fontHead">$1.5k</p>
              <img src="@/assets/svg/arrow-up.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-8 p-6 bg-white">
      <div class="flex justify-between mb-5">
        <p class="text-neutral-700">Total Sales</p>
        <button class="bg-secondary-500 py-3 px-5 flex gap-2 rounded">
          <p class="text-sm font-semibold">Week 3, May</p>
          <img src="@/assets/svg/caret-down.svg" alt="" />
        </button>
      </div>
      <line-chart />
    </div>
  </div>

  <div class="mb-[42px] bg-white p-6">
    <div class="relative flex justify-between">
      <button
        class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
        @click="showDateModal2 = true"
      >
        <p class="text-sm">{{ dateFilterValue || 'Filter By Date' }}</p>
        <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
      </button>

      <button
        class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
        @click="showLocationModal = true"
      >
        <p class="text-sm">{{ dateFilterValue || 'All location' }}</p>
        <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
      </button>

      <div
        class="absolute shadow-sm flex top-0 left-[170px] bg-white w-[284px] rounded-bl-lg rounded-r-lg flex-col py-6 px-4"
        v-if="showDateModal2"
        v-click-away="() => (showDateModal2 = false)"
      >
        <div
          v-for="(date, i) in dateArray"
          :key="`date-range-${i}`"
          class="p-4"
        >
          <p
            class="text-[18px] cursor-pointer"
            @click="handleSelectDateFilter(date)"
          >
            {{ date.text }}
          </p>
        </div>
      </div>

      <div
        class="absolute shadow-sm flex top-[50px] right-[-24px] bg-white w-[284px] rounded-bl-lg rounded-r-lg flex-col py-6 px-4"
        v-show="showLocationModal"
        v-click-away="() => (showLocationModal = false)"
      >
        <div
          v-for="(location, i) in locationArray"
          :key="`date-range-${i}`"
          class="p-4"
        >
          <p
            class="text-[18px] cursor-pointer"
            @click="handleSelectDateFilter(location)"
          >
            {{ location.text }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div
        class="input-container w-[300px] border border-neutral-400 rounded flex px-3 justify-between"
      >
        <input
          type="text"
          placeholder="Search for partner"
          class="w-full outline-none py-2 rounded"
        />
        <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
      </div>

      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:accepted>
          <accepted-partners-table
            @selected-action="handleShowConfirmPartnerModal"
            @selected-reject-action="handleShowRejectModal"
            @selected-download-action="handleShowDownloadModal"
          />
          <pagination
            class=""
            :current-page="1"
            :total-records="80"
            :per-page="5"
            @onchange="console.log('kenny')"
          />
        </template>

        <template v-slot:pending>
          <accepted-partners-table
            @selected-action="handleShowConfirmPartnerModal"
            @selected-reject-action="handleShowRejectModal"
            @selected-download-action="handleShowDownloadModal"
          />
          <pagination
            class=""
            :current-page="1"
            :total-records="80"
            :per-page="5"
            @onchange="console.log('kenny')"
          />
        </template>

        <template v-slot:rejected>
          <accepted-partners-table
            @selected-action="handleShowConfirmPartnerModal"
            @selected-reject-action="handleShowRejectModal"
            @selected-download-action="handleShowDownloadModal"
          />
          <pagination
            class=""
            :current-page="1"
            :total-records="80"
            :per-page="5"
            @onchange="console.log('kenny')"
          />
        </template>
      </EaTabs>
    </div>
  </div>

  <ea-modal
    @close-modal="showConfirmPartnerModal = false"
    :setup="{
      modalActive: showConfirmPartnerModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div v-show="confirmStep === 1">
      <div class="mb-[42px]">
        <img
          src="@/assets/svg/confirm-step-1.svg"
          class="object-cover w-full"
          alt=""
        />
      </div>
      <p class="text-[23px] font-semibold font-fontHead mb-4">
        Confirming partner info
      </p>
      <p class="mb-6">
        You’re about to leave this page to verify the partner’s business name
        and other information given by the partner upon registration on
        Companies House Developer Hub
      </p>

      <div class="flex justify-between gap-[112px]">
        <button
          class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
          @click="handleShowConfirmPartnerModal"
        >
          Cancel
        </button>

        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="confirmStep = 2"
        >
          Verify
        </button>
      </div>
    </div>

    <div v-show="confirmStep === 2">
      <div class="mb-[42px]">
        <img
          src="@/assets/svg/confirm-step=2.svg"
          class="object-cover w-full"
          alt=""
        />
      </div>
      <p class="text-[23px] font-semibold font-fontHead mb-4">
        Creating partner #ID
      </p>
      <p class="mb-6">
        An Identification number #AB-001 has been created for this partner, to
        be use when uploading their product on the website
      </p>

      <div class="flex justify-between gap-[112px]">
        <button
          class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
          @click="handleShowConfirmPartnerModal"
        >
          Reject
        </button>

        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="confirmStep = 3"
        >
          Accept
        </button>
      </div>
    </div>

    <div v-show="confirmStep === 3">
      <div class="mb-[42px]">
        <img
          src="@/assets/svg/confirm-step-3.svg"
          class="object-cover w-full"
          alt=""
        />
      </div>
      <p class="text-[23px] font-semibold font-fontHead mb-4">
        One-time password
      </p>
      <p class="mb-6">
        A one-time password - nd245drrf41 has been created for this partner to
        be used to sign in to the partner account. Kindly use the button to
        share as an email to bayodeog@yahoo.com
      </p>

      <div class="inline-flex justify-between gap-[112px]">
        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="handleShowConfirmPartnerModal"
        >
          Send as email
        </button>
      </div>
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showRejectModal = false"
    :setup="{
      modalActive: showRejectModal,
      modalTitle: 'Rejection reason',
      isVerification: false,
    }"
  >
    <div v-show="rejectStep === 1">
      <div class="">
        <p class="text-neutral-700">
          Select the reason for rejecting this application, it will be use to
          tailor the email notification for the intending partner
        </p>
      </div>
      <div
        class="border rounded border-neutral-400 bg-white py-4 px-3 flex justify-between cursor-pointer mt-6"
        v-for="(reject, i) in rejectionArray"
        :key="reject.id"
        @click="handleSelectedReason(reject)"
      >
        <p class="text-neutral-700 text-[18px]">{{ reject.text }}</p>
        <img
          src="@/assets/svg/circle-checked.svg"
          alt=""
          v-if="reject.selected"
        />
        <img
          src="@/assets/svg/circle-unchecked.svg"
          alt=""
          v-else="reject.selected"
        />
      </div>
      <div class="inline-flex justify-between gap-[112px] mt-6">
        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="rejectStep = 2"
        >
          Next
        </button>
      </div>
    </div>

    <div v-show="rejectStep === 2">
      <div class="">
        <p class="text-neutral-700">
          A rejection mail has been created for this partner. Kindly use the
          button to share to the partner’s email bayodeog@yahoo.com
        </p>
      </div>

      <div class="inline-flex justify-between gap-[112px] mt-6">
        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="showRejectModal = false"
        >
          Send as email
        </button>
      </div>
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showDownloadModal = false"
    :setup="{
      modalActive: showDownloadModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div v-show="rejectStep === 1">
      <div class="">
        <p class="text-neutral-800 text-[23px] font-semibold">
          All downloadable files - 10 files
        </p>
        <p class="text-neutral-700">
          All the downloadable files will be available on your device
        </p>
      </div>

      <div class="flex justify-between gap-[112px] mt-6">
        <button
          class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
          @click="handleShowDownloadModal"
        >
          Cancel
        </button>
        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="rejectStep = 2"
        >
          Download
        </button>
      </div>
    </div>

    <div v-show="rejectStep === 2">
      <div class="">
        <p class="text-neutral-700">
          A rejection mail has been created for this partner. Kindly use the
          button to share to the partner’s email bayodeog@yahoo.com
        </p>
      </div>

      <div class="inline-flex justify-between gap-[112px] mt-6">
        <button
          class="py-4 w-full px-6 rounded bg-primary-500 text-white"
          @click="showRejectModal = false"
        >
          Send as email
        </button>
      </div>
    </div>
  </ea-modal>
</template>

<script setup>
import { ref } from 'vue';
import StatCard from './components/StatCard.vue';
import Arc from './components/Arc.vue';
import LineChart from './components/LineChart.vue';
import EaTabs from '@/components/EaTabs.vue';
import AcceptedPartnersTable from './components/AcceptedPartnersTable.vue';
import Pagination from '@/components/pagination.vue';

const showDateModal = ref(false);
const showDateModal2 = ref(false);
const showLocationModal = ref(false);
const showConfirmPartnerModal = ref(false);
const showRejectModal = ref(false);
const showDownloadModal = ref(false);

const confirmStep = ref(1);
const rejectStep = ref(1);

const dateArray = ref([
  { text: 'Today - 7/26/2024', value: '7/26/2024' },
  { text: 'Yesterday - 7/25/2024', value: '7/25/2024' },
  { text: 'This Week', value: 'This Week' },
  { text: 'All Time', value: 'All_time' },
  { text: 'Custom Date', value: 'custom_date' },
]);

const locationArray = ref([
  { text: 'All location', value: '7/26/2024' },
  { text: 'Manchester United', value: '7/25/2024' },
  { text: 'Birmingham', value: 'This Week' },
  { text: 'Liverpool', value: 'All_time' },
  { text: 'London', value: 'custom_date' },
]);
const dateFilterValue = ref('');

const onClickAway = () => {
  console.log(showDateModal.value);

  showDateModal.value = false;
  console.log(showDateModal.value);
};

const onClickAway2 = () => {
  showDateModal2.value = false;
};

const onClickAway3 = () => {
  // showDateModal2.value = false;
  // showDateModal2.value = false;
  showLocationModal.value = false;
};

const handleSelectDateFilter = (date) => {
  dateFilterValue.value = date.text;
  // onClickAway();
};

const statCardArray = ref([
  {
    title: 'Income',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },

  {
    title: 'Gross revenue',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },

  {
    title: 'Total sales',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },
  {
    title: 'Total payment',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },
  {
    title: 'Buyers',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },
  {
    title: 'Partners',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },

  {
    title: 'App download',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },

  {
    title: 'All users',
    amount: '209,811',
    percIncrease: '13%',
    numIncrease: '18k',
  },
]);

const activeTab = ref(0);
const tabs = [
  {
    title: 'Accepted partners(5)',
    name: 'accepted',
  },
  {
    title: 'Pending partners(5)',
    name: 'pending',
  },

  {
    title: 'Rejected partners(5)',
    name: 'rejected',
  },
];

const handleShowConfirmPartnerModal = (e) => {
  console.log(e);
  confirmStep.value = 1;
  showConfirmPartnerModal.value = !showConfirmPartnerModal.value;
};

const handleShowRejectModal = (e) => {
  console.log(e);
  rejectStep.value = 1;
  showRejectModal.value = !showRejectModal.value;
};

const handleSelectedReason = (reason) => {
  rejectionArray.value.forEach((c) => {
    c.selected = c.id === reason.id;
  });
};

const handleShowDownloadModal = (item) => {
  showDownloadModal.value = !showDownloadModal.value;
  console.log(item);
};

const rejectionArray = ref([
  {
    id: 1,
    text: 'Issue with uploaded documents',
    selected: false,
  },
  {
    id: 2,
    text: 'Business address confirmation',
    selected: false,
  },
  {
    id: 3,
    text: 'Business name confirmation',
    selected: false,
  },
]);
</script>

<style lang="scss" scoped></style>
