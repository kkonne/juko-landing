import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import InlineSvg from 'vue-inline-svg';

const app = createApp(App);
app.component('inline-svg', InlineSvg);
app.use(router);
app.mount('#app')