import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueClickAway from 'vue3-click-away';
import VueLuxon from 'vue-lux';

import App from './App.vue';
import router from './http/router';

import EaButton from '@/components/EaButton.vue';
import EaModal from '@/components/EaModal.vue';
// import EaInput from '@/components/global/EaInput.vue';
// import EaSelect from '@/components/global/EaSelect.vue';
import EaSpinner from '@/components/EaSpinner.vue';
import EaNavbar from '@/components/EaNavbar.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app.component('EaButton', EaButton);
app.component('EaModal', EaModal);
app.component('VueDatePicker', VueDatePicker);
// app.component('EaInput', EaInput);
// app.component('EaSelect', EaSelect);
app.component('EaSpinner', EaSpinner);
app.component('EaNavbar', EaNavbar);
app.use(VueClickAway);
app.use(VueLuxon, {
  input: {
    zone: 'utc',
    format: 'iso',
  },
  output: 'short',
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(VueQueryPlugin);
app.use(pinia);
app.use(router);
app.use(Toast, {
  position: 'top-right',
  timeout: 1500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
});

app.mount('#app');
