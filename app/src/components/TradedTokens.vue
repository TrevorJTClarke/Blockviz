<template>
  <div class="all-tokens">
    <label>Traded Tokens</label>
    <div class="token-list">
      <div class="token" v-for="item in allTokens">
        <!-- {{ item.address }}: {{ item.amount }} -->
        <Address :data="item" />
        {{ item.amount }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { addCommas } from '../utils/helpers.js';
import Address from './Address.vue';

export default {
  name: 'TradedTokens',
  components: {
    Address,
  },

  data() {
    return {
      allTokens: [],
    };
  },

  computed: {
    ...mapGetters(['cache']),
  },

  methods: {
    ...mapActions(['getMarketHistoricalByPair']),
    formatData() {
      const dataMap = {};
      const dataTotals = [];

      // Sum the current snapshot of tokens
      Object.keys(this.cache).forEach((c) => {
        const b = this.cache[c]
        if (b && b.tokens && Object.keys(b.tokens).length > 0) {
          Object.keys(b.tokens).forEach((t) => {
            dataMap[t] = dataMap[t] ? parseFloat(dataMap[t]) + parseFloat(b.tokens[t]) : parseFloat(b.tokens[t]);
          });
        }
      });

      // combine into easier format, and sort by highest amounts
      // TODO: Add traded price value, if we have!
      Object.keys(dataMap).forEach((g) => {
        dataTotals.push({ address: g, amount: dataMap[g] });
      });
      console.log('dataTotals', dataTotals)

      this.allTokens = dataTotals.sort((a, b) => b.amount - a.amount);
    },
  },

  mounted() {
    this.formatData()
  },
};
</script>

<style>
.block-metadata {
}
</style>
