<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">#ID</th>
          <th class="text-sm text-grey-500">Author</th>
          <th class="text-sm text-grey-500">Title</th>
          <th class="text-sm text-grey-500">Date</th>
          <th class="text-sm text-grey-500"></th>
        </tr>
      </thead>
      <tbody v-if="props.loading === false">
        <tr v-for="(item, index) in props?.items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $lux(item._updatedAt) }}</td>
          <td>
            <div class="relative">
              <img
                src="@/assets/svg/dots-vertical.svg"
                alt=""
                class="cursor-pointer"
                @click="toggleModal(item)"
              />

              <!-- Only show modal for the specific row -->
              <div
                v-if="item.showModal"
                class="absolute z-[10000] shadow-lg top-[30px] right-[-80px] bg-white w-[284px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <!-- Content inside the modal -->
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleViewDetails(item)"
                >
                  <p class="text-[18px]">View blog</p>
                </div>

                <!-- <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectOrderHistory(item)"
                >
                  <p class="text-[18px]">View Order History</p>
                </div> -->

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleDeletePosts(item)"
                >
                  <p class="text-[18px] text-error-500">Delete Post</p>
                </div>

                <!-- <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="handleSelectSendEmail(item)"
                >
                  <p class="text-[18px]">Send Email</p>
                </div> -->
                <!-- Example: Add more content here -->
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex w-full justify-center mt-10" v-if="props.loading">
      <ea-spinner small class="mx-auto block" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'PaymentHistoryTable',
  props: {
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const tableArray = ref([]);

    tableArray.value = props.items;
    console.log(tableArray.value);
    // console.log(props.items);
    // Function to toggle the modal for a specific row
    const toggleModal = (item) => {
      item.showModal = !item.showModal;
    };

    // Function to close the modal for a specific row
    const closeModal = (item) => {
      item.showModal = false;
    };

    const handleViewDetails = (item) => {
      emit('view-details', item);
    };

    const handleDeletePosts = (item) => {
      emit('delete-post', item);
    };

    return {
      tableArray,
      toggleModal,
      closeModal,
      handleViewDetails,
      handleDeletePosts,

      props,
    };
  },
};
</script>

<style scoped>
th,
td {
  padding: 12px;
  text-align: left;
}

td {
  border: 1px solid #eee;
  padding: 0 10px 0 10px;
  height: 72px;
  font-size: 14px;
  color: #344054;
}

td:nth-child(1) {
  background-color: #f9fafa;
  font-size: 14px;
  font-family: 'Aileron';
  color: #131826;
}

th {
  border: 1px solid #eee;
  background-color: #f9fafa;
  padding: 16px 8px;
  font-size: 14px;
  font-family: 'Aileron';
  color: #131826;
}
</style>
