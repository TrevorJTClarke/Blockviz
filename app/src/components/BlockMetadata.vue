<template>
  <div class="block-metadata" v-if="hasSeries">
    <apexcharts height="120" width="320" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import BlockBurst from './BlockBurst.vue';
import apexcharts from 'vue-apexcharts';

export default {
  name: 'BlockMetadata',

  components: {
    apexcharts,
  },

  computed: {
    ...mapGetters(['cache']),
    chartOptions() {
      console.log('this.cache', this.cache)
      let categories = [];

      if (this.hasSeries) {
        Object.keys(this.cache).forEach(c => {
          categories.push(this.cache[c].number);
        });
      }
      return {
        chart: {
          id: 'Block Data Overview',
          // stacked: true,
          sparkline: {
            enabled: true,
          },
        },
        xaxis: {
          // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
          categories,
        },
        fill: {
          colors: ['#4E4E4E', '#3A86AD', '#AE497E', '#6B0E12', '#F09B24', '#184B42'],
        },
      };
    },
    hasSeries() {
      return this.cache && Object.keys(this.cache).length > 0;
    },
    series() {
      // console.log('this.cache', this.cache)
      let dataTknTrns = [];
      let dataTxns = [];
      let dataLogs = [];
      let dataFns = [];

      if (this.hasSeries) {
        Object.keys(this.cache).forEach(c => {
          dataTxns.push(this.cache[c].totalTransactions);
          dataTknTrns.push(this.cache[c].totalTokenTransfers);
          dataLogs.push(this.cache[c].totalLogs);
          dataFns.push(this.cache[c].totalFunctions);
        });
      }

      return [{
        name: 'Token Transfers',
        // data: [30, 40, 45, 50, 49, 60, 70, 91],
        data: dataTknTrns,
      }, {
        name: 'Transactions',
        data: dataTxns,
      }, {
        name: 'Logs',
        data: dataLogs,
      }, {
        name: 'Functions',
        data: dataFns,
      }];
    },
  },

  methods: {
    // ...mapActions(['setRange']),
  },
};
</script>

<style>
.block-metadata {
}
</style>
