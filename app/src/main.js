import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import store from './store';

Vue.use(VueApexCharts);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
