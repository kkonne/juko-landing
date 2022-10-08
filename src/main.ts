import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import InlineSvg from 'vue-inline-svg';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);
app.component('inline-svg', InlineSvg);
app.use(router);
app.use(MotionPlugin);
app.mount('#app');
