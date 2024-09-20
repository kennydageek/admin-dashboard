<template>
  <div>
    <div class="mt-4 w-[60%]">
      <div class="mb-6">
        <p class="mb-2 text-xl text-neutral-800 font-fontHead">
          Media destination
        </p>
        <div
          class="py-4 px-3 border rounded border-neutral-400 flex cursor-pointer justify-between"
          @click="showMediaModal = true"
        >
          <p class="text-[18px] text-neutral-700">
            {{ mediaType || 'Select from the available options' }}
          </p>
          <img src="@/assets/svg/caret-down.svg" alt="" />
        </div>
      </div>

      <div class="mb-6">
        <p class="mb-2 text-xl text-neutral-800 font-fontHead">Media Section</p>
        <div
          class="py-4 px-3 border rounded border-neutral-400 flex cursor-pointer justify-between"
          @click="showMediaSectionModal = true"
        >
          <p class="text-[18px] text-neutral-700">
            {{ mediaSectionType || 'Select from the available options' }}
          </p>
          <img src="@/assets/svg/caret-down.svg" alt="" />
        </div>
      </div>
    </div>
    <div v-show="showUploadSection">
      <div class="w-[60%]">
        <p class="text-xl font-fontHead text-neutral-800">Upload Media</p>

        <div class="mt-2 flex gap-2.5">
          <div
            class="w-[242px] h-[201.02px] bg-white flex justify-center items-center"
          >
            <img src="@/assets/svg/upload-image.svg" alt="" />
          </div>

          <div
            class="w-[242px] h-[201.02px] bg-white flex justify-center items-center"
          >
            <img src="@/assets/svg/upload-image.svg" alt="" />
          </div>

          <div
            class="w-[242px] h-[201.02px] bg-white flex justify-center items-center"
          >
            <img src="@/assets/svg/upload-image.svg" alt="" />
          </div>
        </div>

        <p class="text-xs text-neutral-500 mt-2">
          Note: all images uploaded should be 25MB
        </p>
      </div>

      <button
        class="mt-[75px] w-[60%] py-4 bg-primary-500 rounded text-[18px] text-white"
      >
        Push Notification
      </button>
    </div>
  </div>

  <ea-modal
    @close-modal="showMediaModal = false"
    :setup="{
      modalActive: showMediaModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div
      class="border rounded border-neutral-400 bg-white py-4 px-3 flex justify-between cursor-pointer mt-6"
      v-for="(media, i) in mediaArray"
      :key="`media-${media.id}`"
      @click="handleSelectedMediaSection(media)"
    >
      <p class="text-neutral-700 text-[18px]">{{ media.text }}</p>
      <img src="@/assets/svg/circle-checked.svg" alt="" v-if="media.selected" />
      <img
        src="@/assets/svg/circle-unchecked.svg"
        alt=""
        v-else="media.selected"
      />
    </div>
  </ea-modal>

  <ea-modal
    @close-modal="showMediaSectionModal = false"
    :setup="{
      modalActive: showMediaSectionModal,
      modalTitle: '',
      isVerification: false,
    }"
  >
    <div
      class="border rounded border-neutral-400 bg-white py-4 px-3 flex justify-between cursor-pointer mt-6"
      v-for="(media, i) in mediaSectionArray"
      :key="`media-${media.id}`"
      @click="handleSelectedMediaSection(media)"
    >
      <p class="text-neutral-700 text-[18px]">{{ media.text }}</p>
      <img src="@/assets/svg/circle-checked.svg" alt="" v-if="media.selected" />
      <img
        src="@/assets/svg/circle-unchecked.svg"
        alt=""
        v-else="media.selected"
      />
    </div>
  </ea-modal>
</template>

<script setup>
import { ref } from 'vue';
const mediaType = ref('');
const mediaSectionType = ref('');
const showMediaSectionModal = ref(false);
const showUploadSection = ref(false);
const showMediaModal = ref(false);

const mediaArray = ref([
  {
    id: 1,
    text: 'Web app',
    selected: false,
  },
  {
    id: 2,
    text: 'Mobile app',
    selected: false,
  },
]);

const mediaSectionArray = ref([
  {
    id: 1,
    text: 'Hero-section',
    selected: false,
  },
  {
    id: 2,
    text: 'CTA',
    selected: false,
  },

  {
    id: 3,
    text: 'Join community',
    selected: false,
  },

  {
    id: 4,
    text: 'Delivery Information',
    selected: false,
  },
]);

const handleSelectedMedia = (category) => {
  mediaArray.value.forEach((c) => {
    c.selected = c.id === category.id;
  });
  mediaType.value = category.text;
  showMediaModal.value = false;

  // console.log(cityArray.value);
};

const handleSelectedMediaSection = (category) => {
  mediaSectionArray.value.forEach((c) => {
    c.selected = c.id === category.id;
  });
  mediaSectionType.value = category.text;
  showMediaSectionModal.value = false;

  showUploadSection.value = true;

  // console.log(cityArray.value);
};
</script>

<style lang="scss" scoped></style>
