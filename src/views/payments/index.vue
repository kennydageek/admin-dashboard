<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="mt-4">
      <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
        Payment history
      </p>

      <div class="relative flex justify-between">
        <button
          class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
          @click="showDateModal2 = true"
        >
          <p class="text-sm">{{ dateFilterValue || 'Filter By Status' }}</p>
          <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
        </button>

        <div
          class="absolute shadow-sm flex top-0 left-[170px] bg-white w-[284px] rounded-bl-lg rounded-r-lg flex-col py-6 px-4"
          v-show="showDateModal2"
          v-click-away="
            () => {
              showDateModal2 = false;
            }
          "
        >
          <div
            v-for="(date, i) in dateArray"
            :key="`date-range-${i}`"
            class="p-4"
          >
            <p
              class="text-[18px] cursor-pointer"
              @click="handleFilterTransaction(date)"
            >
              {{ date.text }}
            </p>
          </div>
        </div>
      </div>

      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:all>
          <customers-table :items="paymentArray" />
          <pagination
            class=""
            :current-page="1"
            :total-records="80"
            :per-page="5"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:processing>
          <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div>
          <customers-table
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

        <template v-slot:completed>
          <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div>
          <customers-table
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

        <template v-slot:canceled>
          <div
            class="my-4 input-container w-[70%] bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-[70%] outline-none py-2 rounded"
            />
            <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
          </div>
          <customers-table
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
</template>

<script setup>
import { ref, watch } from 'vue';
// import StatCard from './components/StatCard.vue';
// import Arc from './components/Arc.vue';
// import LineChart from './components/LineChart.vue';
import EaTabs from '@/components/EaTabs.vue';
import Pagination from '@/components/PaymentPagination.vue';
import CustomersTable from './components/CustomersTable.vue';
import { useRouter } from 'vue-router';
import PaymentService from '@/services/payment';
import FilterForm from '@/components/FilterForm.vue';

// const showDateModal = ref(true);
const showDateModal2 = ref(false);
const showLocationModal = ref(false);
const showConfirmPartnerModal = ref(false);
const showRejectModal = ref(false);
const showDownloadModal = ref(false);

const confirmStep = ref(1);
const rejectStep = ref(1);
const router = useRouter();

const dateArray = ref([
  { text: 'Successful', value: 'success' },
  { text: 'Failed', value: 'failed' },
  { text: 'Pending', value: 'pending' },
  { text: 'Cancelled', value: 'canceled' },
  { text: 'Refunded', value: 'refunded' },
]);

const dateFilterValue = ref('');

const onClickAway = () => {
  // showDateModal.value = false;
  showDateModal2.value = false;
  showLocationModal.value = false;
};

const handleFilterTransaction = async (date) => {
  const data = await PaymentService.filterTransactions({ status: date.value });
  paymentArray.value = data.data;
  currentPage.value = data.page;
  perPage.value = data.per_page;
  hasMore.value = data.has_more;
  dateFilterValue.value = date.text;
  onClickAway();
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
    title: 'All payment (5)',
    name: 'all',
  },
  {
    title: 'Completed (5)',
    name: 'processing',
  },

  {
    title: 'Pending (5)',
    name: 'completed',
  },

  {
    title: 'Canceled (5)',
    name: 'canceled',
  },
  {
    title: 'Failed (5)',
    name: 'canceled',
  },
  {
    title: 'Refunded (5)',
    name: 'canceled',
  },
];

const handleSelectCustomerProfile = (customer) => {
  router.push(`/customer/${customer.id}`);
  console.log(customer);
};

const handleViewOrderHistory = (customer) => {
  console.log('order history clicked');
};

const handleDeactivateAccount = (account) => {
  console.log('deactivate account selected');
};

const handleSendEmail = (account) => {
  console.log('email sent');
};

const currentPage = ref(1);
const perPage = ref(20);
const hasMore = ref(true);
const paymentArray = ref([]);

const fetchTransactions = async (page) => {
  const data = await PaymentService.fetchTransactions(page);
  paymentArray.value = data.data;
  currentPage.value = data.page;
  perPage.value = data.per_page;
  hasMore.value = data.has_more;
  console.log(data);
};

const handlePageChange = (page) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchTransactions({ page: page });
      break;

    default:
      fetchTransactions({ page: page });
  }
};

watch(activeTab, (newTab) => {
  switch (newTab) {
    case 0:
      fetchTransactions({ page: currentPage.value });
      break;
  }
});

// fetchTransactions({ page: currentPage.value });
</script>

<style lang="scss" scoped></style>
