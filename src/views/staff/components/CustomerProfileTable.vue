<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th>
          <th class="text-sm text-grey-500">Order name</th>
          <th class="text-sm text-grey-500">Date</th>
          <th class="text-sm text-grey-500">Price</th>
          <th class="text-sm text-grey-500">Shipping method</th>
          <th class="text-sm text-grey-500">Payment type</th>
          <th class="text-sm text-grey-500">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableArray" :key="index">
          <td>{{ item.id }}</td>
          <td>Order name</td>
          <td>Date</td>
          <td>Price</td>
          <td>Shipping method</td>
          <td>Payment type</td>

          <td><p class="text-sm text-primary-500">Active</p></td>
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
      {
        id: 6,
        showModal: false,
      },
      {
        id: 7,
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
