<template>
  <ea-navbar />

  <div class="my-[42px] bg-white p-6">
    <div class="mt-4">
      <div class="flex justify-between">
        <p
          class="text-xl self-center font-semibold font-fontHead mb-4 text-neutral-800"
        >
          Categories
        </p>
        <div>
          <ea-button @click="handleShowAddCategoryModal"
            >&plus; Add Category</ea-button
          >
        </div>
      </div>

      <customers-table class="mt-4" :items="categoryArray" :loading="loading" />
    </div>
  </div>

  <ea-modal
    @close-modal="showModal = false"
    :setup="{
      modalActive: showModal,
      modalTitle: 'Add Category',
      isVerification: false,
    }"
  >
    <form @submit.prevent="handleCreateCategory">
      <label for="">Name</label>
      <div
        class="w-full mb-4 bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
      >
        <input
          type="text"
          class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          placeholder="Category name"
          v-model="form.name"
          required
        />
      </div>

      <label for="">Description</label>
      <div
        class="w-full mb-4 bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
      >
        <textarea
          type="text"
          class="w-full bg-white block p-3 border-neutral-400 rounded placeholder:text-base placeholder:text-neutral-700 text-neutral-500"
          placeholder="Description"
          v-model="form.description"
          required
        ></textarea>
      </div>

      <label for="">Product Type</label>
      <div
        class="w-full mb-4 bg-white border-neutral-400 pr-3 rounded placeholder:text-base border flex"
      >
        <select
          name=""
          id=""
          v-model="form.productType"
          class="w-full p-3"
          required
        >
          <option value="Fresh Produce">Fresh Produce</option>
          <option value="Ready-made meals">Ready-made meals</option>
        </select>
      </div>

      <ea-button>
        <ea-spinner small v-if="loading" />
        <p v-else>Create Category</p>
      </ea-button>
    </form>
  </ea-modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import EaTabs from '@/components/EaTabs.vue';
import Pagination from '@/components/pagination.vue';
import CustomersTable from './components/CustomersTable.vue';
import { useRouter } from 'vue-router';
import { CategoryService } from '@/services';
import { useToast } from 'vue-toastification';

const showModal = ref(false);
const toast = useToast();
const loading = ref(false);

const categoryArray = ref([]);
const fetchCategories = async (params) => {
  const data = await CategoryService.fetchCategories(params);
  categoryArray.value = data;
  console.log(data);
};

const handleShowAddCategoryModal = () => {
  showModal.value = true;
};

const form = ref({
  name: '',
  description: '',
  productType: '',
});

const handleCreateCategory = async () => {
  try {
    loading.value = true;
    console.log(form.value);
    const data = await CategoryService.createCategory(form.value);
    console.log(data);
    loading.value = false;
    toast.success(data.message);
    categoryArray.value = [];
    await fetchCategories();
    showModal.value = false;
  } catch (error) {}
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped></style>
