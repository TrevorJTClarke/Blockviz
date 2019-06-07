<template>
  <div class="chart-container">
    <apexcharts ref="blockChart" height="60" width="60" type="donut" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { addCommas } from '../utils/helpers.js';
import apexcharts from 'vue-apexcharts';

const colors = ['#3A86AD', '#AE497E', '#F09B24', '#4E4E4E', '#6B0E12', '#184B42'];

export default {
  name: 'BlockSummaryChart',

  components: {
    apexcharts,
  },

  computed: {
    ...mapGetters(['cache']),
    chartOptions() {
      return {
        chart: {
          id: 'Block Summary',
          sparkline: {
            enabled: true,
          },
        },
        colors,
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
            },
          },
        },
      };
    },
    series() {
      const dataTotalTransfers = [];
      const dataTotalTokens = [];

      Object.keys(this.cache).forEach(c => {
        dataTotalTransfers.push(this.cache[c].totalTokenTransfers);
        dataTotalTokens.push(Object.keys(this.cache[c].tokens).length);
      });

      return [{
        name: 'Total Tranfers',
        data: dataTotalTransfers,
      }, {
        name: 'Unique Tokens',
        data: dataTotalTokens,
      }];
    },
  },

  methods: {
    ...mapActions(['getMarketHistoricalByPair']),
  },

  mounted() {
    // this.getMarketHistoricalByPair('eth_usd').then(() => {
    //   console.log('HERE', this.$refs)
    //   this.$refs.tokensChart.updateSeries(this.series, false, true)
    // })
  },
};
</script>

<style>
.block-metadata {
}
</style>
