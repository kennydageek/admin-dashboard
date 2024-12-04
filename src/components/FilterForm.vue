<template>
  <div
    v-if="open"
    class="form flex flex-col md:flex-row md:pt-2 md:pb-1 border-b common-border md:p-5 lg:px-8 text-gray-600 dark:text-gray-400"
  >
    <form class="order-2 md:order-1">
      <div
        class="flex flex-wrap flex-col lg:flex-row space-y-1 md:space-y-0 md:space-x-1 mb-1 justify-start"
      >
        <div
          class="flex flex-wrap lg:space-x-1 mb-5 lg:flex-row flex-col space-y-1 lg:space-y-0"
        >
          <div class="flex flex-wrap gap-2">
            <!-- <button
              class="custom-box-with-hover px-3 rounded hover:bg-gray-100"
              @click.prevent="open_dropdown"
            >
              <i class="bi-filter text-xl"></i>
            </button> -->
            <input
              v-model="search_param"
              class="max-w-[100vw] custom-box w-full md:w-72 py-3 px-5 rounded font-normal text-sm text-gray-600 border bordeer-neutral-400"
              placeholder="Search..."
            /><br />

            <input
              v-model="category"
              class="max-w-[100vw] custom-box w-full md:w-72 py-3 px-5 rounded font-normal text-sm text-gray-600 border bordeer-neutral-400"
              placeholder="category"
            />
            <input
              v-model="productType"
              class="max-w-[100vw] custom-box w-full md:w-72 py-3 px-5 rounded font-normal text-sm text-gray-600 border bordeer-neutral-400"
              placeholder="Product Type"
            />
            <input
              v-model="minPrice"
              class="max-w-[100vw] custom-box w-full md:w-72 py-3 px-5 rounded font-normal text-sm text-gray-600 border bordeer-neutral-400"
              placeholder="Minimum Price"
            />
            <input
              v-model="maxPrice"
              class="max-w-[100vw] custom-box w-full md:w-72 py-3 px-5 rounded font-normal text-sm text-gray-600 border bordeer-neutral-400"
              placeholder="Maximum Price"
            />
            <button
              class="w-1/4 block justify-start self-start bg-primary-500 py-4 rounded text-white"
              @click.prevent="on_submit"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="Object.keys(form).length > 0"
        class="grid grid-cols-2 gap-1 lg:flex flex-col lg:flex-row lg:space-x-1 mb-1 space-y-1 lg:space-y-0"
      >
        <button
          class="custom-box-with-hover py-1 px-1 lg:px-3 rounded text-xs font-light"
          @click="reset_filter_form"
        >
          Clear all
        </button>
        <div
          v-for="(value, key) in form"
          :key="key"
          class="custom-box py-1 px-3 rounded text-xs font-light flex flex-row justify-between"
        >
          <div>
            {{ get_param_name(key) }} :
            <span
              class="font-semibold text-slate-700 dark:text-slate-300 capitalize"
              >{{ get_param_value(key, value) }}</span
            >
          </div>
          <i
            class="bi-x-circle-fill ml-2 cursor-pointer hover:text-red-700"
            @click="remove_param_from_form(key)"
          ></i>
        </div>
      </div>
      <div
        v-if="dropdown_active"
        v-click-away="hide_dropdown"
        class="text-sm font-light w-auto absolute -mt-[90px] md:-mt-0 options shadow-lg bg-white"
      >
        <div
          v-if="dropdown_step === 1"
          class="[&>div:first-child]:rounded-t [&>div:last-child]:rounded-b"
        >
          <div
            v-for="(param, i) in filterParams"
            :key="i"
            class="py-4 pl-4 pr-16 cursor-pointer border-neutral-400 border-[0.5px]"
            @click="select_dropdown_param(param)"
          >
            {{ param.name }}
          </div>
        </div>
        <div v-if="dropdown_step === 2" class="p-7 custom-box rounded">
          <div class="font-semibold">{{ param_selected.name }}</div>
          <input
            v-if="param_selected.options === ''"
            v-model="dropdown_values[param_selected.field_name]"
            class="custom-box px-3 py-2 rounded text-gray-800 mt-3 w-72"
            :placeholder="`Enter ${param_selected.name}`"
          />

          <div
            v-else-if="param_selected.options[0] instanceof Object"
            class="grid grid-cols-auto gap-4 mt-6"
          >
            <div v-for="option in param_selected.options" :key="option.id">
              <input
                :id="`option_${option.id}`"
                v-model="dropdown_values[param_selected.field_name]"
                type="radio"
                :value="option.id"
              />
              <label :for="`option_${option.id}`"> {{ option.name }}</label>
            </div>
          </div>

          <div
            v-else-if="typeof param_selected.options[0] === 'boolean'"
            class="grid grid-cols-auto gap-4 mt-6"
          >
            <div v-for="option in param_selected.options" :key="option">
              <input
                :id="`option_${option}`"
                v-model="dropdown_values[param_selected.field_name]"
                type="radio"
                :value="option"
              />
              <label :for="`option_${option}`" class="capitalize">
                {{ option ? 'Yes' : 'No' }}</label
              >
            </div>
          </div>

          <div v-else class="grid grid-cols-auto gap-4 mt-6">
            <div v-for="option in param_selected.options" :key="option">
              <input
                :id="`option_${option}`"
                v-model="dropdown_values[param_selected.field_name]"
                type="radio"
                :value="option"
              />
              <label
                v-if="typeof option === 'string'"
                :for="`option_${option}`"
                class="capitalize"
              >
                {{ option.replaceAll('_', ' ') }}</label
              >
              <label v-else :for="`option_${option}`" class="capitalize">
                {{ option }}</label
              >
            </div>
          </div>

          <div v-if="error_msg.length > 1" class="mt-4 text-red-500 text-xs">
            {{ error_msg }}
          </div>
          <div class="flex flex-row space-x-12 justify-between mt-6">
            <button
              class="bg-white border border-slate-300 py-1 px-3 rounded text-xs font-light hover:bg-gray-100"
              @click="step_back_dropdown"
            >
              <i class="bi-arrow-left"></i> Back
            </button>
            <button
              class="bg-blue-600 text-white py-1 px-3 rounded text-xs font-light hover:bg-blue-700"
              @click="
                add_param_to_form(
                  param_selected.field_name,
                  dropdown_values[param_selected.field_name]
                )
              "
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// import Vue from 'vue';
import { mixin as VueClickAway } from 'vue3-click-away';

// import StatefulButton from '@/components/StatefulButton.vue';
//import VueRangedatePicker from 'vue-rangedate-picker'

export default {
  name: 'FilterForm',
  //   components: { StatefulButton }, //, VueRangedatePicker },
  mixins: [VueClickAway],
  props: {
    filterParams: {
      type: Array,
      default: null,
    },
    hasSearchField: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      search_param: '',
      category: '',
      productType: '',
      minPrice: '',
      maxPrice: '',
      date_param: { from: '', to: '' },
      dropdown_step: 1,
      param_selected: '',
      error_msg: '',
      dropdown_active: false,
      dropdown_values: {},
      dateRange: [],
    };
  },
  methods: {
    get_param_value(field_name, value) {
      const param = this.filterParams.find(
        (param) => param.field_name == field_name
      );
      value =
        param.options[0] instanceof Object
          ? param.options.find((option) => option.id == value).name
          : value;

      if (typeof value === 'string') return value.replaceAll('_', ' ');
      if (typeof value === 'boolean') return value ? 'Yes' : 'No';

      return value;
    },
    get_param_name(field_name) {
      const param = this.filterParams.find(
        (param) => param.field_name == field_name
      );
      return param.name;
    },
    step_back_dropdown() {
      this.dropdown_step = 1;
      this.param_selected = '';
      this.error_msg = '';
    },
    open_dropdown() {
      if (this.filterParams != null) {
        this.dropdown_active = true;
      }
    },
    hide_dropdown() {
      this.step_back_dropdown();
      this.dropdown_active = false;
    },
    select_dropdown_param(param) {
      this.param_selected = param;
      this.dropdown_step = 2;
    },
    add_param_to_form(field_name, value) {
      if (value != undefined || value === '') {
        //trim the string
        this.form[field_name] = value;
        this.hide_dropdown();
        this.error_msg = '';
        this.dropdown_values = {};
      } else {
        this.error_msg = 'Input cannot be empty!';
      }
    },
    remove_param_from_form(field_name) {
      Vue.delete(this.form, field_name);
    },
    reset_filter_form() {
      this.form = {};
    },
    on_submit() {
      let params = { filters: this.form };

      if (this.search_param !== '') params.keyword = this.search_param;
      if (this.category !== '') params.category = this.category;

      if (this.productType !== '') params.productType = this.productType;
      if (this.minPrice !== '') params.minPrice = this.minPrice;
      if (this.maxPrice !== '') params.maxPrice = this.maxPrice;
      console.log(params);
      this.$emit('submit', params);
    },

    handleDateChange() {
      let dateFrom = this.dateRange[0];
      let dateTo = this.dateRange[1];

      if (dateFrom) {
        // Adjust dateFrom to the correct date
        const adjustedDateFrom = new Date(dateFrom);
        adjustedDateFrom.setDate(adjustedDateFrom.getDate() + 1); // Add 1 day
        this.date_param.from = adjustedDateFrom.toISOString();
      } else {
        this.date_param.from = '';
      }

      if (dateTo) {
        // Adjust dateTo to the correct date
        const adjustedDateTo = new Date(dateTo);
        adjustedDateTo.setDate(adjustedDateTo.getDate() + 1); // Add 1 day
        this.date_param.to = adjustedDateTo.toISOString();
      } else {
        this.date_param.to = '';
      }

      this.$emit('updateDate', this.date_param);
    },
  },
};
</script>

<style scoped>
.options {
  z-index: 10000;
}
</style>
