import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from './router';
import * as Icons from '@ant-design/icons-vue';

const app = createApp(App);

Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});

import { createPinia } from 'pinia';
const pinia = createPinia();
app.use(pinia).use(router).use(Antd).mount('#app');