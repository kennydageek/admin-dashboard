<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="relative flex justify-between">
      <button
        class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
        @click="showDateModal2 = true"
      >
        <p class="text-sm">{{ dateFilterValue || "Filter By Date" }}</p>
        <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
      </button>

      <button
        class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
        @click="showLocationModal = true"
      >
        <p class="text-sm">{{ dateFilterValue || "All location" }}</p>
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
            @click="handleSelectDateFilter(location)"
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
      <div
        class="input-container w-[400px] border border-neutral-400 rounded flex px-3 justify-between"
      >
        <input
          type="text"
          placeholder="Search buyers by name, email, phone number"
          class="w-full outline-none py-2 rounded"
        />
        <img src="@/assets/svg/search.svg" class="cursor-pointer" alt="" />
      </div>

      <EaTabs :tabs="tabs" v-model:activeTab="activeTab" class="mt-4">
        <template v-slot:accepted>
          <customers-table
            @view-customer-profile="handleSelectCustomerProfile"
            @view-order-history="handleViewOrderHistory"
            @deactivate-account="handleDeactivateAccount"
            @send-email="handleSendEmail"
            :items="tableArray"
            :loading="loading"
          />
          <pagination
            class=""
            :current-page="1"
            :total-records="total"
            :per-page="limit"
            @onchange="handlePaginate"
          />
        </template>

        <template v-slot:pending>
          <customers-table
            @selected-action="handleShowConfirmPartnerModal"
            @selected-reject-action="handleShowRejectModal"
            @selected-download-action="handleShowDownloadModal"
            :items="tableArray"
            :loading="loading"
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
          <customers-table
            @selected-action="handleShowConfirmPartnerModal"
            @selected-reject-action="handleShowRejectModal"
            @selected-download-action="handleShowDownloadModal"
            :items="tableArray"
            :loading="loading"
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
import { onMounted, ref } from "vue";
// import StatCard from './components/StatCard.vue';
// import Arc from './components/Arc.vue';
// import LineChart from './components/LineChart.vue';
import EaTabs from "@/components/EaTabs.vue";
import Pagination from "@/components/pagination.vue";
import CustomersTable from "./components/CustomersTable.vue";
import { useRouter } from "vue-router";
import { CustomerService } from "@/services";

// const showDateModal = ref(true);
const showDateModal2 = ref(false);
const showLocationModal = ref(false);
const showConfirmPartnerModal = ref(false);
const showRejectModal = ref(false);
const showDownloadModal = ref(false);
const tableArray = ref([]);
const loading = ref(false);

const confirmStep = ref(1);
const rejectStep = ref(1);
const router = useRouter();

const currentPage = ref(1);
const total = ref(22);
const perPage = ref(20);

const dateArray = ref([
  { text: "Today - 7/26/2024", value: "7/26/2024" },
  { text: "Yesterday - 7/25/2024", value: "7/25/2024" },
  { text: "This Week", value: "This Week" },
  { text: "All Time", value: "All_time" },
  { text: "Custom Date", value: "custom_date" },
]);

const locationArray = ref([
  { text: "All location", value: "7/26/2024" },
  { text: "Manchester United", value: "7/25/2024" },
  { text: "Birmingham", value: "This Week" },
  { text: "Liverpool", value: "All_time" },
  { text: "London", value: "custom_date" },
]);
const dateFilterValue = ref("");

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
    title: "Income",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },

  {
    title: "Gross revenue",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },

  {
    title: "Total sales",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },
  {
    title: "Total payment",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },
  {
    title: "Buyers",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },
  {
    title: "Partners",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },

  {
    title: "App download",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },

  {
    title: "All users",
    amount: "209,811",
    percIncrease: "13%",
    numIncrease: "18k",
  },
]);

const activeTab = ref(0);
const tabs = [
  {
    title: "New Customers(5)",
    name: "accepted",
  },
  {
    title: "Returning Customers(5)",
    name: "pending",
  },

  {
    title: "Inactive Customers(5)",
    name: "rejected",
  },

  {
    title: "Loyal Customers(5)",
    name: "rejected",
  },
];

const handleSelectCustomerProfile = (customer) => {
  router.push(`/customer/${customer._id}`);
  console.log(customer);
};

const handleViewOrderHistory = (customer) => {
  console.log("order history clicked");
};

const handleDeactivateAccount = (account) => {
  console.log("deactivate account selected");
};

const handleSendEmail = (account) => {
  console.log("email sent");
};

const handlePaginate = (e) => {
  fetchCustomers(e, perPage.value);
};

const fetchCustomers = async (page, limit) => {
  try {
    loading.value = true;
    const data = await CustomerService.fetchCustomers({
      page,
      limit,
    });
    tableArray.value = data?.users;
    total.value = data?.total;
    perPage.value = data?.limit;
    currentPage.value = data?.page;
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
};

onMounted(() => {
  fetchCustomers();
});
</script>

<style lang="scss" scoped></style>
