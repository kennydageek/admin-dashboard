<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6 flex justify-between">
    <div class="text-sm text-neutral-800 flex gap-2 self-center">
      <p @click="$router.back()" class="cursor-pointer underline">Lists</p>
      <p>></p>
      <p class="text-slate-400">Customer Profile</p>
    </div>

    <button class="text-white rounded bg-red-500 py-4 px-6">
      Deactivate account
    </button>
  </div>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-4">
      <p class="text-xl font-fontHead font-semibold mb-4">
        Customer Information
      </p>
      <div class="bg-white p-6 rounded-lg">
        <div
          class="flex flex-col items-center border-b-2 border-neutral-100 pb-6"
        >
          <div class="mb-4">
            <img src="@/assets/images/customer-profile-pic.png" alt="" />
            <p class="font-semibold mt-2">
              {{ customer.firstName }} {{ customer.lastName }}
            </p>
          </div>
          <div class="flex gap-2">
            <div class="flex flex-col items-center">
              <img src="@/assets/svg/email-icon.svg" alt="" />
              <p class="text-xs text-neutral-500">Email</p>
            </div>

            <div class="flex flex-col items-center">
              <img src="@/assets/svg/message.svg" alt="" />
              <p class="text-xs text-neutral-500">Message</p>
            </div>

            <div class="flex flex-col items-center">
              <img src="@/assets/svg/call.svg" alt="" />
              <p class="text-xs text-neutral-500">Call</p>
            </div>
          </div>
          <div class="flex gap-1 mt-3">
            <div class="w-1 h-1 rounded-[50%] bg-green-500 self-center"></div>
            <p class="text-xs text-neutral-500">
              Last activity: 7 July at 06:00 AM
            </p>
          </div>
        </div>

        <div class="mt-6">
          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">First name</p>
            <p class="text-neutral-800">{{ customer.firstName || 'N.A' }}</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Last name</p>
            <p class="text-neutral-800">{{ customer.lastName || 'N.A' }}</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Email</p>
            <p class="text-neutral-800">{{ customer.email || 'N.A' }}</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Shipping address</p>
            <p class="text-neutral-800">
              {{ customer.address || 'N.A' }}
            </p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Phone number</p>
            <p class="text-neutral-800">{{ customer.phoneNumber || 'N.A' }}</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Expenses</p>
            <p class="text-neutral-800">£0</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Total Order</p>
            <p class="text-neutral-800">0</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Order returned</p>
            <p class="text-neutral-800">0</p>
          </div>

          <div class="mb-2">
            <p class="text-neutral-500 text-sm mb-1">Amount refunded</p>
            <p class="text-neutral-800">£0</p>
          </div>
        </div>
      </div>

      <div class="mt-8 flex gap-2.5">
        <button class="rounded border w-full bg-neutral-100 py-4 px-6">
          Call
        </button>
        <button
          class="rounded w-full text-white border bg-primary-500 py-4 px-6"
        >
          Send as email
        </button>
      </div>
    </div>
    <div class="col-span-8">
      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:all>
          <div
            class="my-4 input-container w-full bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-full outline-none py-2 rounded"
              v-model="orderId"
            />
            <img
              src="@/assets/svg/search.svg"
              class="cursor-pointer"
              @click="handleSearchOrder"
              alt=""
            />
          </div>
          <div class="bg-white py-6 px-4">
            <customer-profile-table
              :tableArray="allOrders"
              @selected-action="handleShowConfirmPartnerModal"
              @selected-reject-action="handleShowRejectModal"
              @selected-download-action="handleShowDownloadModal"
              :loading="loading"
            />
            <pagination
              class=""
              :current-page="1"
              :total-records="total"
              :per-page="limit"
              @onchange="handlePageChange"
              v-if="total > 0"
            />
          </div>
        </template>

        <template v-slot:processing>
          <div
            class="my-4 input-container w-full bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-full outline-none py-2 rounded"
              v-model="orderId"
            />
            <img
              src="@/assets/svg/search.svg"
              class="cursor-pointer"
              @click="handleSearchOrder"
              alt=""
            />
          </div>
          <div class="bg-white py-6 px-4">
            <customer-profile-table
              :tableArray="allOrders"
              @selected-action="handleShowConfirmPartnerModal"
              @selected-reject-action="handleShowRejectModal"
              @selected-download-action="handleShowDownloadModal"
              :loading="loading"
            />
            <pagination
              class=""
              :current-page="1"
              :total-records="total"
              :per-page="limit"
              @onchange="handlePageChange"
              v-if="total > 0"
            />
          </div>
        </template>

        <template v-slot:completed>
          <div
            class="my-4 input-container w-full bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-full outline-none py-2 rounded"
              v-model="orderId"
            />
            <img
              src="@/assets/svg/search.svg"
              class="cursor-pointer"
              @click="handleSearchOrder"
              alt=""
            />
          </div>
          <div class="bg-white py-6 px-4">
            <customer-profile-table
              :tableArray="allOrders"
              @selected-action="handleShowConfirmPartnerModal"
              @selected-reject-action="handleShowRejectModal"
              @selected-download-action="handleShowDownloadModal"
              :loading="loading"
            />
            <pagination
              class=""
              :current-page="1"
              :total-records="total"
              :per-page="limit"
              @onchange="handlePageChange"
              v-if="total > 0"
            />
          </div>
        </template>

        <template v-slot:canceled>
          <div
            class="my-4 input-container w-full bg-white border border-neutral-400 rounded flex px-3 justify-between"
          >
            <input
              type="text"
              placeholder="Search products by name, price, date"
              class="w-full outline-none py-2 rounded"
              v-model="orderId"
            />
            <img
              src="@/assets/svg/search.svg"
              class="cursor-pointer"
              @click="handleSearchOrder"
              alt=""
            />
          </div>
          <div class="bg-white py-6 px-4">
            <customer-profile-table
              :tableArray="allOrders"
              @selected-action="handleShowConfirmPartnerModal"
              @selected-reject-action="handleShowRejectModal"
              @selected-download-action="handleShowDownloadModal"
              :loading="loading"
            />
            <pagination
              class=""
              :current-page="1"
              :total-records="total"
              :per-page="limit"
              @onchange="handlePageChange"
              v-if="total > 0"
            />
          </div>
        </template>
      </EaTabs>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// import StatCard from './components/StatCard.vue';
// import Arc from './components/Arc.vue';
// import LineChart from './components/LineChart.vue';
import EaTabs from '@/components/EaTabs.vue';
import Pagination from '@/components/pagination.vue';
import CustomerProfileTable from './components/CustomerProfileTable.vue';
import { useRouter, useRoute } from 'vue-router';
import { CustomerService } from '@/services';

const orderId = ref('');
// const showDateModal = ref(true);
const showDateModal2 = ref(false);
const showLocationModal = ref(false);
const showConfirmPartnerModal = ref(false);
const showRejectModal = ref(false);
const showDownloadModal = ref(false);
const loading = ref(false);

const currentPage = ref(1);
const total = ref(0);
const perPage = ref(20);

const confirmStep = ref(1);
const rejectStep = ref(1);
const router = useRouter();
const route = useRoute();
const customer = ref({});
const allOrders = ref([]);
const processingOrders = ref([]);
const cancelledOrders = ref([]);

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
  // showDateModal.value = false;
  showDateModal2.value = false;
  showLocationModal.value = false;
};

const handleSelectDateFilter = (date) => {
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
    title: 'All orders(5)',
    name: 'all',
  },
  {
    title: 'Processing(5)',
    name: 'processing',
  },

  {
    title: 'Completed(5)',
    name: 'completed',
  },

  {
    title: 'Canceled(5)',
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

const fetchCustomerById = async () => {
  const customerId = route.params.id; // Assumes customer ID is part of the route
  try {
    const data = await CustomerService.fetchCustomerById(customerId);
    console.log(data);
    customer.value = data;
  } catch (error) {
    console.error('Failed to load customer data:', error);
  }
};

const fetchAllCustomerOrders = async (page, limit = 20) => {
  const customerId = route.params.id;
  try {
    loading.value = true;
    const data = await CustomerService.fetchAllCustomerOrders(customerId, {
      page,
      limit,
    });
    console.log(data);
    allOrders.value = data?.orders;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data?.page;
    loading.value = false;
  } catch (error) {
    console.error('Failed to load all customer orders:', error);
    loading.value = false;
  }
};

const fetchAllCustomerProcessingOrders = async (page, limit = 20) => {
  const customerId = route.params.id;
  try {
    loading.value = true;
    const data = await CustomerService.fetchAllCustomerProcessingOrders(
      customerId,
      {
        page,
        limit,
      }
    );
    console.log(data);
    allOrders.value = data?.orders;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data?.page;
    loading.value = false;
  } catch (error) {
    console.error('Failed to load all customer orders:', error);
    loading.value = false;
  }
};

const fetchAllCustomerCompletedOrders = async (page, limit = 20) => {
  const customerId = route.params.id;
  try {
    loading.value = true;
    const data = await CustomerService.fetchAllCustomerCompletedOrders(
      customerId,
      {
        page,
        limit,
      }
    );
    console.log(data);
    allOrders.value = data?.orders;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data?.page;
    loading.value = false;
  } catch (error) {
    console.error('Failed to load all customer orders:', error);
    loading.value = false;
  }
};

const fetchAllCustomerCancelledOrders = async (page, limit = 20) => {
  const customerId = route.params.id;
  try {
    loading.value = true;
    const data = await CustomerService.fetchAllCustomerCancelledOrders(
      customerId,
      {
        page,
        limit,
      }
    );
    console.log(data);
    allOrders.value = data?.orders;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data?.page;
    loading.value = false;
  } catch (error) {
    console.error('Failed to load all customer orders:', error);
    loading.value = false;
  }
};

const handlePageChange = (page) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchAllCustomerOrders(page, perPage.value);
      break;
    case 1: // Processing orders
      fetchAllCustomerProcessingOrders(page, perPage.value);
      break;
    case 2: // Completed orders
      fetchAllCustomerCompletedOrders(page, perPage.value);

      break;
    case 3: // Canceled orders
      fetchAllCustomerCancelledOrders(page, perPage.value);
      break;
    default:
      console.error('Unknown tab selected');
  }
};

watch(activeTab, (newTab) => {
  switch (newTab) {
    case 0:
      fetchAllCustomerOrders(1, 20);
      break;
    case 1:
      fetchAllCustomerProcessingOrders(1, 20);
      break;
    // Add cases for other tabs as needed
    case 2:
      fetchAllCustomerCompletedOrders(1, 20);

      break;
    case 3:
      fetchAllCustomerCancelledOrders(1, 20);

      break;
    default:
      fetchAllCustomerOrders(1, 20);
  }
});

const handleSearchOrder = async () => {
  const data = await CustomerService.searchCustomerOrders(route.params.id, {
    orderId: orderId.value,
  });

  allOrders.value = data.users;
  console.log(data);
};

onMounted(() => {
  fetchCustomerById();
  fetchAllCustomerOrders();
  // fetchAllCustomerProcessingOrders();
  // fetchAllCustomerCancelledOrders();
});
</script>

<style lang="scss" scoped></style>
