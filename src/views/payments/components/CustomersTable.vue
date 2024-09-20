<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <!-- <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th> -->
          <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th>
          <th class="text-sm text-grey-500">Order name</th>
          <th class="text-sm text-grey-500">Date</th>
          <th class="text-sm text-grey-500">Price</th>
          <th class="text-sm text-grey-500">Shipping method</th>
          <th class="text-sm text-grey-500">Payment type</th>
          <th class="text-sm text-grey-500">Status</th>
          <!-- <th class="text-sm text-grey-500"></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableArray" :key="index">
          <!-- <td>{{ item.id }}</td> -->
          <td>#ID</td>
          <td>Order name</td>
          <td>Date</td>
          <td>Price</td>
          <td>Shipping method</td>
          <td>Payment type</td>

          <td><p class="text-sm text-primary-500">Active</p></td>
          <!-- <td>
            <div class="relative">
              <img
                src="@/assets/svg/dots-vertical.svg"
                alt=""
                class="cursor-pointer"
                @click="toggleModal(item)"
              />

              <div
                v-if="item.showModal"
                class="absolute z-[10000] shadow-lg top-[30px] right-[-80px] bg-white w-[284px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectCustomerProfile(item)"
                >
                  <p class="text-[18px]">View Customer Profile</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectOrderHistory(item)"
                >
                  <p class="text-[18px]">View Order History</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectDeactivateAccount(item)"
                >
                  <p class="text-[18px]">Deactivate Account</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectSendEmail(item)"
                >
                  <p class="text-[18px]">Send Email</p>
                </div>
              </div>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'PaymentHistoryTable',
  setup(props, { emit }) {
    const tableArray = ref([
      {
        id: 1,
        showModal: false,
      },
      {
        id: 2,
        showModal: false,
      },
      {
        id: 3,
        showModal: false,
      },
      {
        id: 4,
        showModal: false,
      },
      {
        id: 5,
        showModal: false,
      },
    ]);

    // Function to toggle the modal for a specific row
    const toggleModal = (item) => {
      item.showModal = !item.showModal;
    };

    // Function to close the modal for a specific row
    const closeModal = (item) => {
      item.showModal = false;
    };

    const handleSelectCustomerProfile = (item) => {
      emit('view-customer-profile', item);
    };

    const handleSelectOrderHistory = (item) => {
      emit('view-order-history', item);
    };

    const handleSelectDeactivateAccount = (item) => {
      emit('deactivate-account', item);
    };

    const handleSelectSendEmail = (item) => {
      emit('send-email', item);
    };

    return {
      tableArray,
      toggleModal,
      closeModal,
      handleSelectCustomerProfile,
      handleSelectOrderHistory,
      handleSelectDeactivateAccount,
      handleSelectSendEmail,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 12px;
  text-align: center;
}

td {
  padding: 0 16px 0 16px;
  height: 72px;
  font-size: 14px;
  color: #344054;
}

th {
  background-color: #f9fafa;
  padding: 16px 8px;
  font-size: 14px;
  font-family: 'Aileron';
  color: #131826;
}
</style>
