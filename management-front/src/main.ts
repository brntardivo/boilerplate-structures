import { createApp } from 'vue';
import { vMaska } from 'maska';
import { createPinia } from 'pinia';
import '@css/index.css';
import router from './router';
import App from './App.vue';

const pinia = createPinia();

createApp(App).directive('mask', vMaska).use(pinia).use(router).mount('#app');
