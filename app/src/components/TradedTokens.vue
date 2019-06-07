<template>
  <div class="all-tokens">
    <label>Traded Tokens</label>
    <div class="token-list">
      <div class="token" v-for="item in allTokens">
        <Address :data="item" />
        <div class="amt-chip">
          <h4>${{ item.totalValue }}</h4>
          <span>{{ item.amount }} @ ${{ item.price }}</span>
        </div>
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
    ...mapGetters(['cache', 'rankings', 'activeRange']),
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
        // TODO: rankings!
        const rankData = this.rankings.filter((r) => r.address && r.address === g);
        let tokenData;
        // NOTE: Only showing tradeable assets for now!
        if (rankData && rankData[0]) {
          const totalValue = (parseFloat(rankData[0].currentPrice) * parseFloat(dataMap[g])).toFixed(2);
          tokenData = {
            address: g,
            amount: addCommas(parseFloat(dataMap[g]).toFixed(4)),
            totalValue: addCommas(totalValue),
            totalValueRaw: totalValue,
            price: addCommas(parseFloat(rankData[0].currentPrice).toFixed(2)),
            ...rankData[0]
          };
          dataTotals.push(tokenData);
        }
      });

      this.allTokens = dataTotals.sort((a, b) => b.totalValueRaw - a.totalValueRaw);
    },
  },

  mounted() {
    this.formatData()
  },

  watch: {
    activeRange: ['formatData'],
  },
};
</script>

<style>
.token-list {
  display: flex;
  flex-direction: column;
  background: white;
  overflow: scroll;
  max-height: 50vh;
  padding: 5px 5px 10px;
  margin: 0 -12px;
}

.token {
  display: flex;
  justify-content: space-between;
  margin: 2px 0;
}
.token-list .token:nth-child(odd) {
  background: rgba(0,0,0,0.02);
}

.amt-chip {
  text-align: right;
}
.amt-chip h4 {
  margin: 0;
  font-size: 10pt;
}
.amt-chip span {
  display: block;
  font-size: 8pt;
}
</style>
