<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="mt-4">
      <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
        Feedback
      </p>

      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:all>
          <!-- <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div> -->
          <customers-table
            :staffData="feedbackArray"
            :isLoading="isLoading"
            @view-details="viewDetails"
          />
          <pagination
            class="mt-5"
            :current-page="1"
            :total-records="total"
            :per-page="20"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:marketplace>
          <!-- <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div> -->
          <customers-table
            :staffData="feedbackArray"
            :isLoading="isLoading"
            @view-details="viewDetails"
          />
          <pagination
            class="mt-5"
            :current-page="1"
            :total-records="total"
            :per-page="20"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:partner>
          <!-- <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div> -->
          <customers-table
            :staffData="feedbackArray"
            :isLoading="isLoading"
            @view-details="viewDetails"
          />
          <pagination
            class="mt-5"
            :current-page="1"
            :total-records="total"
            :per-page="5"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:recipe>
          <customers-table
            :staffData="feedbackArray"
            :isLoading="isLoading"
            @view-details="viewDetails"
          />
          <pagination
            class="mt-5"
            :current-page="1"
            :total-records="total"
            :per-page="5"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:general>
          <customers-table
            :staffData="feedbackArray"
            :isLoading="isLoading"
            @view-details="viewDetails"
          />
          <pagination
            class="mt-5"
            :current-page="1"
            :total-records="total"
            :per-page="5"
            @onchange="handlePageChange"
          />
        </template>
      </EaTabs>
    </div>
  </div>

  <ea-modal
    @close-modal="showModal = false"
    :setup="{
      modalActive: showModal,
      modalTitle: 'Details',
      isVerification: false,
    }"
  >
    <div class="flex gap-10">
      <p class="text-xl">Platform:</p>
      <p>{{ selectedDetails.platform }}</p>
    </div>
    <div class="flex gap-10">
      <p class="text-xl">about:</p>
      <p>{{ selectedDetails.about }}</p>
    </div>
    <div class="flex gap-10">
      <p class="text-xl">Details:</p>
      <p>{{ selectedDetails.details }}</p>
    </div>
  </ea-modal>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// import StatCard from './components/StatCard.vue';
// import Arc from './components/Arc.vue';
// import LineChart from './components/LineChart.vue';
import EaTabs from '@/components/EaTabs.vue';
import Pagination from '@/components/pagination.vue';
import CustomersTable from './components/CustomersTable.vue';
import { useRouter } from 'vue-router';
import { FeedbackService } from '@/services';

const router = useRouter();
const showModal = ref(false);

const onClickAway = () => {
  // showDateModal.value = false;
  showDateModal2.value = false;
  showLocationModal.value = false;
};

const handleSelectDateFilter = (date) => {
  dateFilterValue.value = date.text;
  onClickAway();
};

const activeTab = ref(0);
const tabs = [
  {
    title: 'All',
    name: 'all',
  },
  {
    title: 'Marketplace',
    name: 'marketplace',
  },

  {
    title: 'Partner',
    name: 'partner',
  },

  {
    title: 'Recipe',
    name: 'recipe',
  },

  {
    title: 'General',
    name: 'general',
  },
];

const currentPage = ref(1);
const isLoading = ref(false);
const total = ref(2);

const feedbackArray = ref([]);
const fetchFeedbacks = async (params) => {
  isLoading.value = true;
  const data = await FeedbackService.fetchFeedbacks(params);
  total.value = data.total;
  feedbackArray.value = data.feedback;
  isLoading.value = false;
  console.log(data);
};

const fetchMarketplaceFeedback = async (params) => {
  isLoading.value = true;
  const data = await FeedbackService.fetchMarketplaceFeedback(params);
  total.value = data.total;
  feedbackArray.value = data.feedback;
  isLoading.value = false;
  console.log(data);
};

const fetchPartnerFeedback = async (params) => {
  isLoading.value = true;
  const data = await FeedbackService.fetchPartnerFeedback(params);
  total.value = data.total;
  feedbackArray.value = data.feedback;
  isLoading.value = false;
  console.log(data);
};

const fetchRecipeFeedback = async (params) => {
  isLoading.value = true;
  const data = await FeedbackService.fetchRecipeFeedback(params);
  total.value = data.total;
  feedbackArray.value = data.feedback;
  isLoading.value = false;
  console.log(data);
};

const fetchGeneralFeedback = async (params) => {
  isLoading.value = true;
  const data = await FeedbackService.fetchGeneralFeedback(params);
  total.value = data.total;
  feedbackArray.value = data.feedback;
  isLoading.value = false;
  console.log(data);
};

const selectedDetails = ref({});

const viewDetails = (e) => {
  showModal.value = true;
  selectedDetails.value = e;
  console.log(e);
};

const handlePageChange = (page) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchFeedbacks({ page: page });
      break;
    case 1:
      fetchMarketplaceFeedback({ page: currentPage.value });
      break;
    case 2: // Completed orders
      fetchPartnerFeedback({ page: currentPage.value });

      break;
    case 3: // Canceled orders
      fetchRecipeFeedback({ page: currentPage.value });
      break;

    case 4: // Canceled orders
      fetchGeneralFeedback({ page: currentPage.value });
      break;
    default:
      fetchFeedbacks({ page: currentPage.value });
  }
};

// onMounted(async () => {
//   await fetchFeedbacks({ page: currentPage.value });
// });

watch(activeTab, (newTab) => {
  switch (newTab) {
    case 0:
      fetchFeedbacks({ page: currentPage.value });
      break;
    case 1:
      fetchMarketplaceFeedback({ page: currentPage.value });
      break;
    // // Add cases for other tabs as needed
    case 2:
      fetchPartnerFeedback({ page: currentPage.value });
      break;

    case 3: // Canceled orders
      fetchRecipeFeedback({ page: currentPage.value });
      break;

    case 4: // Canceled orders
      fetchGeneralFeedback({ page: currentPage.value });
      break;

    //   break;
    default:
      fetchFeedbacks({ page: currentPage.value });
  }
});
</script>

<style lang="scss" scoped></style>
