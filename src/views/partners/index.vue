<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="relative flex justify-between">
      <div class="w-[300px] self-stretch">
        <VueDatePicker
          class="w-[300px] h-full border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500"
          placeholder="Filter by date"
          range
          :month-change-on-scroll="false"
          :clearable="false"
          v-model="modelValue"
          @range-start="handleUpdateRangeStart"
          @range-end="handleUpdateRangeEnd"
          @blur="handleFilterByDate"
        ></VueDatePicker>
      </div>
    

      <div
        class="w-[400px] bg-white border border-neutral-400 rounded flex px-3 justify-between"
      >
        <input
          type="text"
          placeholder="Enter location"
          class="w-full outline-none py-2 rounded"
          v-model="location"
        />
        <img
          src="@/assets/svg/search.svg"
          class="cursor-pointer"
          @click="handleSearchByLocation"
          alt=""
        />
      </div>

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
            @click="handleSelectDateFilter(date)"
          >
            {{ date.text }}
          </p>
        </div>
      </div>

      <div
        class="absolute shadow-sm flex top-[50px] right-[-24px] bg-white w-[284px] rounded-bl-lg rounded-r-lg flex-col py-6 px-4"
        v-show="showLocationModal"
        v-click-away="
          () => {
            showLocationModal = false;
          }
        "
      >
        <div
          v-for="(location, i) in locationArray"
          :key="`date-range-${i}`"
          class="p-4"
        >
          <p
            class="text-[18px] cursor-pointer"
            @click="handleSelectLocationFilter(location)"
          >
            {{ location.text }}
          </p>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
        Customer history
      </p>
      <!-- <div
        class="input-container w-[400px] border border-neutral-400 rounded flex px-3 justify-between"
      >
        <input
          type="text"
          placeholder="Search buyers by name, email, phone number"
          class="w-full outline-none py-2 rounded"
        />
        <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
      </div> -->

      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:all>
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
            @view-customer-profile="handleSelectCustomerProfile"
            @view-order-history="handleViewOrderHistory"
            @deactivate-account="handleDeactivateAccount"
            @send-email="handleSendEmail"
            :items="partnerArray"
            :loading="loading"
          />
          <pagination
            :current-page="1"
            :total-records="total"
            :per-page="limit"
            @onchange="handlePaginate"
          />
        </template>

        <template v-slot:entrepreneur>
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
            :items="partnerArray"
            :loading="loading"
          />
          <pagination
            :current-page="1"
            :total-records="total"
            :per-page="limit"
            @onchange="handlePaginate"
          />
        </template>

        <template v-slot:restaurant>
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
            :items="partnerArray"
            :loading="loading"
          />
          <pagination
            :current-page="1"
            :total-records="total"
            :per-page="limit"
            @onchange="handlePaginate"
          />
        </template>

        <template v-slot:vendors>
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
            :items="partnerArray"
            :loading="loading"
          />
          <pagination
            :current-page="1"
            :total-records="total"
            :per-page="limit"
            @onchange="handlePaginate"
          />
        </template>
      </EaTabs>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
// import StatCard from './components/StatCard.vue';
// import Arc from './components/Arc.vue';
// import LineChart from './components/LineChart.vue';
import EaTabs from '@/components/EaTabs.vue';
import Pagination from '@/components/pagination.vue';
import CustomersTable from './components/CustomersTable.vue';
import { useRouter } from 'vue-router';
import { PartnerService } from '@/services';

// const showDateModal = ref(true);
const showDateModal2 = ref(false);
const showLocationModal = ref(false);
const showConfirmPartnerModal = ref(false);
const showRejectModal = ref(false);
const showDownloadModal = ref(false);

const confirmStep = ref(1);
const rejectStep = ref(1);
const router = useRouter();

const currentPage = ref(1);
const total = ref(22);
const perPage = ref(20);
const loading = ref(false);

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
const locationFilterValue = ref('');

const onClickAway = () => {
  // showDateModal.value = false;
  showDateModal2.value = false;
  showLocationModal.value = false;
};

const handleSelectDateFilter = (date) => {
  dateFilterValue.value = date.text;
  onClickAway();
};

const handleSelectLocationFilter = (date) => {
  locationFilterValue.value = date.text;
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
    title: 'All partners (5)',
    name: 'all',
  },
  {
    title: 'Entrepreneur (5)',
    name: 'entrepreneur',
  },

  {
    title: 'Restaurant (5)',
    name: 'restaurant',
  },

  {
    title: 'Vendors (5)',
    name: 'vendors',
  },
];

const partnerArray = ref([]);

const handlePaginate = (e) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchPartners(currentPage.value, perPage.value);
      break;
    case 1: // Processing orders
      fetchEntrepreneurs(currentPage.value, perPage.value);
      break;
    case 2: // Completed orders
      fetchRestaurant(currentPage.value, perPage.value);

      break;
    case 3: // Canceled orders
      fetchVendors(currentPage.value, perPage.value);
      break;
    default:
      console.error('Unknown tab selected');
  }
};

watch(activeTab, (newTab) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchPartners(currentPage.value, perPage.value);
      break;
    case 1: // Processing orders
      fetchEntrepreneurs(currentPage.value, perPage.value);
      break;
    case 2: // Completed orders
      fetchRestaurant(currentPage.value, perPage.value);

      break;
    case 3: // Canceled orders
      fetchVendors(currentPage.value, perPage.value);
      break;
    default:
      console.error('Unknown tab selected');
  }
});

const fetchPartners = async (page, limit) => {
  try {
    loading.value = true;
    const data = await PartnerService.fetchPartners({
      page,
      limit,
    });
    partnerArray.value = data.partners;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const fetchEntrepreneurs = async (page, limit) => {
  try {
    loading.value = true;
    const data = await PartnerService.fetchEntrepreneurs({
      page,
      limit,
    });
    partnerArray.value = data.partners;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const fetchVendors = async (page, limit) => {
  try {
    loading.value = true;
    const data = await PartnerService.fetchVendors({
      page,
      limit,
    });
    partnerArray.value = data.partners;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const fetchRestaurant = async (page, limit) => {
  try {
    loading.value = true;
    const data = await PartnerService.fetchRestaurant({
      page,
      limit,
    });
    partnerArray.value = data.partners;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

// onMounted(() => {
//   fetchPartners({ page: currentPage.value, limit: limit.value });
// });

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

const modelValue = ref('');
const start = ref('');
const end = ref('');
const location = ref('');
const handleUpdateRangeStart = (e) => {
  const formattedStart = new Date(e).toISOString().split('T')[0];
  start.value = formattedStart;
  console.log(formattedStart);
  console.log(e);
};

const handleUpdateRangeEnd = async (e) => {
  const formattedEnd = new Date(e).toISOString().split('T')[0];
  end.value = formattedEnd;

  if (end.value === '') {
    toast.error('Select a complete date range');
    return;
  }
};

const handleFilterByDate = async () => {
  try {
    loading.value = true;
    const data = await PartnerService.searchPartners({
      start: start.value,
      end: end.value,
    });
    partnerArray.value = data.users;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};

const handleSearchByLocation = async () => {
  try {
    loading.value = true;
    const data = await PartnerService.searchPartners({
      address: location.value,
    });
    partnerArray.value = data.users;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data.page;
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
