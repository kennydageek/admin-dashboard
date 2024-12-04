<template>
  <div class="flex justify-between md:justify-end pagination">
    <div class="flex gap-4 justify-end text-center w-full mt-10">
      <a
        href="#"
        class="rounded-lg border border-grey-300 bg-white p-2 font-medium text-gray-700 hover:bg-gray-50"
        @click="newPage(pages.prev)"
      >
        &larr; Prev
      </a>

      <a
        href="#"
        class="rounded-lg border border-grey-300 bg-white p-2 font-medium text-gray-700 hover:bg-gray-50"
        @click="newPage(pages.next)"
        v-if="hasMore"
      >
        Next &rarr;
      </a>
    </div>
    <div
      class="hidden md:flex md:flex-1 px-6 md:items-center md:justify-end text-sm font-light"
    >
      <!-- <div>
        Showing <span class="font-normal">{{ from }}</span> to
        <span class="font-normal">{{ to }}</span> of
        <span class="font-normal">{{ totalRecords }}</span> results
      </div> -->
      <!-- <div> -->
      <!-- <nav
        class="flex justify-end isolate xl:inline-flex text-base items-center font-light bg-white rounded"
        aria-label="Pagination"
      >
        <a
          href="#"
          class="relative p-2 font-medium text-gray-700 hover:bg-gray-50"
          @click="newPage(pages.prev)"
        >
          <div class="flex gap-2">
            <img src="@/assets/svg/caret-left-black.svg" alt="" />
          </div>
        </a> -->
      <!-- <div>
          <span v-for="(n, i) in pages?.items" :key="i">
            <a
              href="#"
              class="relative rounded-lg inline-flex px-4 py-1"
              :class="{
                'bg-secondary-500   p-3': current === n,
              }"
              @click="newPage(n)"
            >
              {{ n }}
            </a>
          </span>
        </div> -->
      <!-- <a
          href="#"
          class="relative flex p-2 font-medium text-gray-700 hover:bg-gray-50"
          @click="newPage(pages.next)"
          ><div class="flex gap-2">
            <!-- <p class="lato-medium text-sm text-[#344054] font-medium">Next</p> -->
      <!--  <img src="@/assets/svg/caret-right-black.svg" alt="" />
          </div>
        </a>
      </nav> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    hasMore: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      from: 1,
      to: this.perPage,
      current: this.currentPage,
      maxPages: Math.ceil(this.totalRecords / this.perPage),
      pages: {},
    };
  },
  watch: {
    currentPage: function (val) {
      this.current = val;
      this.setPage();
    },
    totalRecords: function (val) {
      this.maxPages = Math.ceil(val / this.perPage);
    },
    perPage: function (val) {
      this.maxPages = Math.ceil(this.totalRecords / val);
      this.setPage();
    },
  },
  mounted() {
    setTimeout(() => this.newPage(1), 100);
  },
  methods: {
    newPage: function (page) {
      if (page > 0 && this.hasMore) {
        this.current = page;
        this.setPage();
        this.$emit('onchange', page);
      }
    },
    setPage() {
      this.from = this.perPage * (this.current - 1) + 1;
      const to = this.from + this.perPage - 1;
      this.to = to > this.totalRecords ? this.totalRecords : to;
      this.pages = this.paginate();
    },
    paginate() {
      const current = this.current;
      const max = this.maxPages;

      if (!current || !max) return null;

      let prev = current === 1 ? null : current - 1;
      let next = current === max ? null : current + 1;
      let items = [1];

      if (current === 1 && max === 1) return { current, prev, next, items };
      if (current > 4) items.push('…');

      let r = 2,
        r1 = current - r,
        r2 = current + r;

      for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

      if (r2 + 1 < max) items.push('…');
      if (r2 < max) items.push(max);

      return { current, prev, next, items };
    },
  },
};
</script>

<style scoped>
.pagination {
  /* font-family: 'Inter', sans-serif !important; */
}
</style>
