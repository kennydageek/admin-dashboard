<template>
  <transition name="modal-animation">
    <div
      class=""
      :class="{
        hidden: !props.setup.modalActive,
        'modal-container': props.setup.modalActive,
        'modal-container close': !props.setup.modalActive,
      }"
    >
      <div class="relative w-full h-screen">
        <div class="modal-inner-container">
          <div class="modal-inner" v-show="props.setup.modalActive">
            <div
              class="flex justify-between w-full mb-6"
              v-if="props.setup.isVerification == false"
            >
              <div
                class="text-NavyBlue-900 lato-semi-bold text-2xl self-center"
              >
                {{ props.setup.modalTitle }}
              </div>
              <button
                class="border-0 rounded-full close-modal-btn w-[20px] h-[24px] flex justify-center item-ends cursor-pointer self-center"
                @click="closeModal"
              >
                <img
                  src="@/assets/svg/close.svg"
                  class="w-full"
                  v-if="props.setup.isVerification == false"
                />
              </button>
            </div>

            <div><slot /></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
const emit = defineEmits(['closeModal']);

const props = defineProps<{
  setup: {
    modalActive: boolean;
    modalTitle: string;
    isVerification: boolean;
  };
}>();

const closeModal = () => {
  emit('closeModal');
};

const HideOverflowInBodyTag = () => {
  const bodyElement = document?.getElementsByTagName('body')[0];
  bodyElement?.classList?.add('overflow-hidden');
};
const ShowOverflowInBodyTag = () => {
  const bodyElement = document?.getElementsByTagName('body')[0];
  bodyElement?.classList?.remove('overflow-hidden');
};

watch(
  props,
  () => {
    if (props.setup.modalActive) {
      HideOverflowInBodyTag();
    } else {
      ShowOverflowInBodyTag();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="css" scoped>
.modal-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 50, 56, 0.6);
  border: 0;
  backdrop-filter: blur(2px);
  z-index: 1000;
}

.modal-inner-container {
  display: none;
}

.modal-container .modal-inner-container {
  width: 100%;
  /* max-height: calc(100vh - 100px); */
  background-color: white;
  position: absolute;
  bottom: 0px;
  padding: 24px 16px 48px 16px;
  animation: animateBottom 1000ms ease-in-out;
  display: block;
  overflow: scroll;
}

@keyframes animateBottom {
  from {
    bottom: -1000px;
  }
  to {
    bottom: 0;
  }
}

@media (min-width: 640px) {
  .modal-container .modal-inner-container {
    width: 500px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 16px 16px 0px 0px;
  }
}

@media (min-width: 768px) {
  .modal-container .modal-inner-container {
    max-height: 500px;
    height: auto;
    width: 500px;
    left: 50%;
    top: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    padding: 48px;
    margin: 0;
    animation: none;
  }
}

@media (min-width: 1440px) {
  .modal-container .modal-inner-container {
    width: 635px;
    /* max-height: 400px; */
  }
}

@media (min-width: 1650px) {
  .modal-container .modal-inner-container {
    width: 635px;
    /* max-height: 400px; */
  }
}
</style>
