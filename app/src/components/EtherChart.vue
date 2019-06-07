<template>
  <div class="chart-container">
    <label>Ether Transferred</label>
    <apexcharts ref="etherChart" height="80" width="320" type="line" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { addCommas } from '../utils/helpers.js';
import apexcharts from 'vue-apexcharts';

const colors = ['#F09B24', '#4E4E4E', '#3A86AD', '#AE497E', '#6B0E12', '#184B42'];

export default {
  name: 'EtherChart',

  components: {
    apexcharts,
  },

  computed: {
    ...mapGetters(['cache', 'ether', 'activeRange']),
    chartOptions() {
      return {
        chart: {
          id: 'Ether Transferred',
          stacked: true,
          sparkline: {
            enabled: true,
          },
        },
        colors,
        stroke: {
          width: 2,
        },
      };
    },
    series() {
      const ethPrice = parseFloat(this.ether.currentPrice);
      const dataTotalEther = [];
      const dataTotalUsd = [];

      Object.keys(this.cache).forEach(c => {
        const totalEth = parseFloat(this.cache[c].totalEther);
        const usdVal = parseFloat(ethPrice * totalEth).toFixed(2);
        dataTotalEther.push(totalEth);
        dataTotalUsd.push(usdVal);
      });

      return [{
        name: 'Total Ether',
        data: dataTotalEther,
      }, {
        name: 'Total USD Value',
        data: dataTotalUsd,
      }];
    },
  },

  methods: {
    ...mapActions(['getMarketHistoricalByPair']),
    refresh() {
      this.$refs.etherChart.refresh();
    },
  },

  mounted() {
    this.getMarketHistoricalByPair('eth_usd').then(() => {
      this.refresh()
    })
  },

  watch: {
    activeRange: ['refresh'],
  },
};
</script>

<style>
.block-metadata {
}
</style>
