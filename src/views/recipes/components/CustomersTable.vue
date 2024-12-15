<template>
  <div class="">
    <table class="w-full">
      <thead>
        <tr class="rounded-[16px]">
          <th class="rounded-l-[16px] text-sm text-grey-500">Image</th>
          <th class="text-sm text-grey-500">#ID</th>
          <th class="text-sm text-grey-500">Product name</th>
          <th class="text-sm text-grey-500">Category</th>
          <!-- <th class="text-sm text-grey-500">Price (£)</th> -->
          <!-- <th class="text-sm text-grey-500">Stock</th> -->
          <!-- <th class="text-sm text-grey-500">Weight</th> -->
          <!-- <th class="text-sm text-grey-500">Status</th> -->
          <th class="text-sm text-grey-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="`product-${i}`">
          <!-- <td><input type="checkbox" /></td> -->
          <td>
            <img
              :src="item?.images[0]"
              class="object-cover block mx-auto w-[72px] h-[50px]"
              alt=""
            />
          </td>
          <td>
            {{ item._id.slice(0, 10) }}
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.category || 'Grains' }}</td>

          <!-- <td class="">{{ item.productVariant[0].price }}</td> -->
          <!-- <td class="">{{ item.productVariant[0].totalStock }}</td> -->

          <!-- <td>
            {{ item.productVariant[0].weight }}
            {{ item.productVariant[0].unit }}
          </td> -->
          <!-- <td>
            <div
              class="p-2 rounded-lg text-green-500 bg-green-50 inline-flex gap-2"
            >
              <div class="w-2 h-2 rounded-[50%] bg-green-500 self-center"></div>
              <span>{{ item.status || 'Available' }}</span>
            </div>
          </td> -->
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
                class="absolute z-[10000] shadow-lg top-[30px] right-[0px] bg-white w-[284px] rounded-bl-lg rounded-r-lg py-6 px-4 !text-left"
                v-click-away="() => closeModal(item)"
              >
                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('add-to-featured-products', item);
                      closeModal(item);
                    }
                  "
                >
                  <p class="text-[18px]">Add to Featured Recipes</p>
                </div>

                <div
                  class="p-4 cursor-pointer hover:bg-neutral-50"
                  @click="
                    () => {
                      $emit('remove-from-featured-products', item);
                      closeModal(item);
                    }
                  "
                >
                  <p class="text-[18px]">Remove from Featured Recipes</p>
                </div>

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
