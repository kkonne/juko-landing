import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import axios from 'axios'
import axios from '@/services/axios'
import VueAxios from 'vue-axios'

// axios.defaults.baseURL = 'http://192.168.2.29:8000/api/';
// axios.defaults.headers.common['x-localization'] = `en`

import InlineSvg from 'vue-inline-svg';

const app = createApp(App);
app.component('inline-svg', InlineSvg);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.mount('#app')