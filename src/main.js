import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueClickAway from 'vue3-click-away';

import App from './App.vue';
import router from './router';

import EaButton from '@/components/EaButton.vue';
import EaModal from '@/components/EaModal.vue';
// import EaInput from '@/components/global/EaInput.vue';
// import EaSelect from '@/components/global/EaSelect.vue';
import EaSpinner from '@/components/EaSpinner.vue';
import EaNavbar from '@/components/EaNavbar.vue';

const app = createApp(App);

app.component('EaButton', EaButton);
app.component('EaModal', EaModal);
// app.component('EaInput', EaInput);
// app.component('EaSelect', EaSelect);
app.component('EaSpinner', EaSpinner);
app.component('EaNavbar', EaNavbar);
app.use(VueClickAway);

app.use(createPinia());
app.use(router);

app.mount('#app');
