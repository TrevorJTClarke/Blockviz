<template>
  <div class="chart-container">
    <label>Tokens Transferred</label>
    <apexcharts ref="tokensChart" height="80" width="320" type="line" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { addCommas } from '../utils/helpers.js';
import apexcharts from 'vue-apexcharts';

const colors = ['#3A86AD', '#AE497E', '#F09B24', '#4E4E4E', '#6B0E12', '#184B42'];

export default {
  name: 'TokenValuesChart',

  components: {
    apexcharts,
  },

  computed: {
    ...mapGetters(['cache', 'activeRange']),
    chartOptions() {
      return {
        chart: {
          id: 'Tokens Transferred',
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
    refresh() {
      this.$refs.tokensChart.refresh();
    },
  },

  mounted() {
    this.refresh();

    setTimeout(() => {
      this.refresh();
    }, 4000);
  },

  watch: {
    // activeRange: ['refresh'],
    cache: ['refresh'],
  },
};
</script>

<style>
.block-metadata {
}
</style>
