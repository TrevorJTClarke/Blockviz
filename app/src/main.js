import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import * as AxComponents from 'ax-components';
import '@webcomponents/custom-elements/src/native-shim';
import App from './App.vue';
import store from './store';

// Required to map components naming to class
const supportedComponents = {
  ChipAddress: 'ax-chip-address',
};

// Ignore vue compilation namespaces:
Vue.config.ignoredElements = Object.values(supportedComponents);

// Loop through components & inject into window
Object.keys(supportedComponents).forEach((c) => {
  if (!window.customElements.get(supportedComponents[c])) {
    window.customElements.define(supportedComponents[c], AxComponents[c]());
  }
});

Vue.use(VueApexCharts);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
