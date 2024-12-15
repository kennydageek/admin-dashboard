<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="mt-4">
      <div class="flex justify-between mb-4">
        <p class="text-xl font-semibold font-fontHead mb-4 text-neutral-800">
          Products
        </p>
        <!-- <div>
          <ea-button @click="$router.push('/blogs/create')"
            >Create Blog Post</ea-button
          >
        </div> -->
      </div>

      <!-- <div class="relative flex justify-between">
        <button
          class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
          @click="showDateModal2 = true"
        >
          <p class="text-sm">{{ dateFilterValue || 'Filter By Status' }}</p>
          <img src="@/assets/svg/caret-down.svg" alt="" class="self-center" />
        </button>

        <button
          class="py-4 px-6 gap-2 rounded border border-[#edefef] bg-neutral-50 inline-flex"
          @click="showLocationModal = true"
        >
          <p class="text-sm">{{ dateFilterValue || 'All location' }}</p>
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
      </div> -->
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
            :items="blogArray"
            @add-to-featured-products="showAddToFeaturedModal"
            @remove-from-featured-products="showRemoveFromFeaturedModal"
          />
          <pagination
            class=""
            :key="keyIndex"
            :current-page="1"
            :total-records="total"
            :per-page="1"
            @onchange="handlePageChange"
          />
        </template>

        <template v-slot:featured>
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
            :items="blogArray"
            @add-to-featured-products="showAddToFeaturedModal"
            @remove-from-featured-products="showRemoveFromFeaturedModal"
          />
          <pagination
            class=""
            :key="keyIndex"
            :current-page="1"
            :total-records="total"
            :per-page="1"
            @onchange="handlePageChange"
          />
        </template>
        <!--

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
        </template> -->
      </EaTabs>
    </div>
  </div>

  <ea-modal
    @close-modal="showFeaturedModal = false"
    :setup="{
      modalActive: showFeaturedModal,
      modalTitle: 'Add to Featured Products',
      isVerification: false,
    }"
    class="overflow-scroll"
  >
    <p class="text-neutral-700 mb-6">
      Are you sure you want to add this product to Featured Products?
    </p>

    <div class="flex justify-between gap-[112px] mt-6">
      <button
        class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
        @click="showFeaturedModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 w-full px-6 rounded bg-primary-500 text-white"
        @click="handleAddToFeaturedProducts"
      >
        <ea-spinner v-if="isDeleting" small />
        <span v-else> Add </span>
      </button>
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showRemoveFeaturedModal = false"
    :setup="{
      modalActive: showRemoveFeaturedModal,
      modalTitle: 'Remove from Featured Products',
      isVerification: false,
    }"
    class="overflow-scroll"
  >
    <p class="text-neutral-700 mb-6">
      Are you sure you want to remove this product from Featured Products?
    </p>

    <div class="flex justify-between gap-[112px] mt-6">
      <button
        class="py-4 w-full px-6 rounded border border-neutral-100 bg-neutral-50"
        @click="showRemoveFeaturedModal = false"
      >
        Cancel
      </button>
      <button
        class="py-4 w-full px-6 rounded bg-primary-500 text-white"
        @click="handleRemoveFromFeaturedProducts"
      >
        <ea-spinner v-if="isDeleting" small />
        <span v-else> Remove </span>
      </button>
    </div>
  </ea-modal>
</template>

<script setup>
import { ProductService } from '@/services';
import { onMounted, ref, watch } from 'vue';
import CustomersTable from './components/CustomersTable.vue';
import Pagination from '@/components/pagination.vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import EaTabs from '@/components/EaTabs.vue';

const toast = useToast();
const showFeaturedModal = ref(false);
const showRemoveFeaturedModal = ref(false);
const isDeleting = ref(false);
const router = useRouter();
const currentPage = ref(1);
const total = ref(10);
const keyIndex = ref(0);
const fetchProducts = async (params) => {
  const data = await ProductService.fetchProducts(params);
  total.value = data.total;
  console.log(data);
  blogArray.value = data;
};

const fetchFeaturedProducts = async (params) => {
  const data = await ProductService.fetchFeaturedProducts(params);
  total.value = data.total;
  console.log(data);
  blogArray.value = data;
};

// const handlePageChange = (e) => {
//   fetchProducts({ page: e });
// };

const blogArray = ref([]);

const handleShowDetails = (e) => {
  router.push(`/blogs/${e._id}/details`);
  console.log(e);
  // router.push('/')
};

const postId = ref({});

const handleAddToFeaturedProducts = async () => {
  const payload = {
    productId: postId.value.id,
    type: postId.value.type,
  };

  try {
    console.log(postId.value);
    isDeleting.value = true;
    const data = await ProductService.addToFeaturedProducts(payload);
    console.log(data);
    toast.success(data.responseMessage);
    isDeleting.value = false;
    showFeaturedModal.value = false;
    setTimeout(() => {
      fetchProducts({ page: 1 });
    }, 2000);
  } catch (error) {}
};

const handleRemoveFromFeaturedProducts = async () => {
  const payload = {
    productId: postId.value.id,
    type: postId.value.type,
  };

  try {
    console.log(postId.value);
    isDeleting.value = true;
    const data = await ProductService.removeFromFeaturedProducts(payload);
    console.log(data);
    toast.success(data.responseMessage);
    isDeleting.value = false;
    showFeaturedModal.value = false;
    setTimeout(() => {
      fetchProducts({ page: 1 });
    }, 2000);
  } catch (error) {
    isDeleting.value = false;
  }
};

// const handleShowDeleteModal = (e) => {
//   postId.value = e._id;
//   showDeleteModal.value = true;
// };

const showAddToFeaturedModal = (e) => {
  postId.value = e;
  showFeaturedModal.value = true;
};

const showRemoveFromFeaturedModal = (e) => {
  postId.value = e;
  showRemoveFeaturedModal.value = true;
};

const activeTab = ref(0);

const tabs = [
  {
    title: 'Featured Products',
    name: 'featured',
  },
  {
    title: 'All Products',
    name: 'all',
  },
];

const handlePageChange = (e) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchFeaturedProducts({ page: e });
      break;
    case 1: // Processing orders
      fetchProducts({ page: e });
      break;

    default:
      console.error('Unknown tab selected');
  }
};

watch(activeTab, (newTab) => {
  switch (activeTab.value) {
    case 0: // All orders
      fetchFeaturedProducts({ page: currentPage.value });
      break;
    case 1: // Processing orders
      fetchProducts({ page: currentPage.value });
      break;

    default:
      console.error('Unknown tab selected');
  }
});

// onMounted(() => {
//   fetchProducts({ page: 1 });
// });
</script>

<style lang="scss" scoped></style>
