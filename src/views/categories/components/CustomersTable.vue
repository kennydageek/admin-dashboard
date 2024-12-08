<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <!-- <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th> -->
          <th class="text-sm text-grey-500">Name</th>
          <th class="text-sm text-grey-500">Description</th>
        </tr>
      </thead>
      <tbody v-if="props.loading === false && props?.items?.length !== 0">
        <tr v-for="(item, index) in props?.items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex w-full justify-center mt-10" v-if="props.loading">
      <ea-spinner small class="mx-auto block" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import EaSpinner from '@/components/EaSpinner.vue';

export default {
  name: 'PaymentHistoryTable',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EaSpinner,
  },
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
      props,
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
