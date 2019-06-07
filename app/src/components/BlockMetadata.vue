<template>
  <div class="block-metadata">
    <div class="ether-section">
      <EtherChart />
      <TokenValuesChart />
    </div>
    <!-- <div class="summary">
      <BlockSummaryChart />
    </div> -->
    <div class="tokens">
      <TradedTokens />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import apexcharts from 'vue-apexcharts';
import EtherChart from './EtherChart.vue';
import TokenValuesChart from './TokenValuesChart.vue';
import BlockSummaryChart from './BlockSummaryChart.vue';
import TradedTokens from './TradedTokens.vue';

export default {
  name: 'BlockMetadata',

  components: {
    apexcharts,
    EtherChart,
    TokenValuesChart,
    BlockSummaryChart,
    TradedTokens,
  },

  computed: {
    ...mapGetters(['cache']),
    hasCache() {
      return this.cache && Object.keys(this.cache).length > 0;
    },
  },

  methods: {
    ...mapActions(['getMarketRankings']),
  },

  mounted() {
    this.getMarketRankings().then(() => {
      console.log('DONeE')
    })
  },
};
</script>

<style>
.block-metadata {
  padding: 0 12px;
}

.chart-container label {
  color: grey;
  font-size: 8pt;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 10px;
  display: block;
}

.tokens {
  margin-top: 20px;
}
</style>
