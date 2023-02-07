import { createApp } from 'vue';
import { vMaska } from 'maska';

import '@css/index.css';
import router from './router';
import App from './App.vue';

createApp(App).directive('mask', vMaska).use(router).mount('#app');
