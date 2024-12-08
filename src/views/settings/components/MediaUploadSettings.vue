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
          <div class="w-[200px] flex justify-center items-center">
            <image-upload @updateImageUrl="updateImageUrl" :key="uploadKey" />
          </div>
        </div>

        <p class="text-xs text-neutral-500 mt-2">
          Note: all images uploaded should be 25MB
        </p>
      </div>
    </div>
  </div>
  <button
    type="submit"
    class="mt-[75px] w-[60%] py-4 bg-primary-500 rounded text-[18px] text-white"
    @click="handleMediaUpload"
  >
    <ea-spinner small v-if="loading" />
    <p v-else>Upload Media</p>
  </button>

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
      @click="handleSelectedMedia(media)"
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
import ImageUpload from '@/components/ImageUpload.vue';
import { NotificationService } from '@/services';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const mediaType = ref('');
const mediaSectionType = ref('');
const showMediaSectionModal = ref(false);
const showUploadSection = ref(false);
const showMediaModal = ref(false);
const imageUrl = ref('');
const loading = ref(false);
const toast = useToast();
const uploadKey = ref(0);

const router = useRouter();

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

const updateImageUrl = (e) => {
  imageUrl.value = e;
};

const handleMediaUpload = async () => {
  try {
    loading.value = true;

    console.log('dkd');
    const payload = {
      mediaDestination: mediaSectionType.value,
      mediaSection: mediaType.value,
      imageUrl: imageUrl.value,
    };
    console.log(payload);
    const data = await NotificationService.uploadMedia(payload);
    toast.success(data.message);
    mediaSectionType.value = '';
    mediaType.value = '';
    uploadKey.value += 1;
    router.push('/settings');
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
