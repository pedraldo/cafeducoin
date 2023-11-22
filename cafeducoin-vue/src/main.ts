import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-toast-notification/dist/theme-default.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

// Store
app.use(pinia);

// Router
import router from './router';
app.use(router);

// Interceptor
import '@/http/_interceptor';

// datefns
import setDefaultOptions from 'date-fns/setDefaultOptions';
import { fr } from 'date-fns/locale'
setDefaultOptions({ locale: fr })

app.mount('#app');

import 'bootstrap/dist/js/bootstrap.min.js';