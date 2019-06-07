import axios from 'axios';

const getHeaders = (options) => {
  return {
    headers: {
      'x-api-key': options.apiKey || '',
    },
  };
};

export default {
  getBlockVisual({ state, commit }, id) {
    const url = `${state.constants.apiUrl}/visual/${id}`;
    return axios
      .get(url)
      .then(r => {
        let parsed
        try {
          const match = r.data.match(/(?<=\<data type\=\"text\/json\"\>)(.*)(?=<\/data>)/);
          parsed = match && match.length > 0 ? JSON.parse(match[0]) : {};
        } catch (e) {
          // nothing
        }

        if (parsed && parsed.number) {
          commit('UPDATE_CACHE', { id: parsed.number, data: parsed })
        }

        return r.data;
      });
  },

  setRange({ commit, state }, { start, end }) {
    let total = Math.abs(parseInt(start || 0, 10) - parseInt(end || 0, 10));
    if (total > 100 || !end) total = 10;
    const value = [];

    // loop and form promises
    /* eslint no-plusplus:0 */
    for (let i = 0; i < total; i++) {
      const num = parseInt(start, 10) + i;
      value.push(num);
    }
    commit('UPDATE_DATA', { key: 'activeRange', value });

    if (!state.currentBlock || !state.currentBlock.number) {
      commit('UPDATE_DATA', {
        key: 'currentBlock',
        value: { number: value[value.length - 1] },
      });
    }
  },

  setNewBlock({ commit, state }, block) {
    if (!block || !block.number) return;
    let clone = [].concat(state.activeRange);

    // Check if it exists, only push if new
    if (!clone.includes(block.number)) clone.push(block.number);
    // make sure order is kept
    clone = clone.sort((a, b) => b - a).reverse();

    commit('UPDATE_DATA', { key: 'activeRange', value: clone });
    commit('UPDATE_DATA', { key: 'currentBlock', value: block });
  },

  toggleType({ state, commit }, id) {
    const clone = { ...state.activeTypes };
    clone[id] = !clone[id];
    commit('UPDATE_DATA', { key: 'activeTypes', value: clone });
  },

  getMarketRankings({ commit, state }) {
    const url = `${state.constants.amberdataUrl}/market/rankings`;
    const options = getHeaders(state.constants);
    axios.get(url, options).then(r => {
      const p = r.data.payload;
      const ether = p.data.filter(a => a.name === 'Ethereum')[0]

      // cache the results
      commit('UPDATE_DATA', { key: 'rankings', value: p.data });
      commit('UPDATE_DATA', { key: 'ether', value: ether });
    });
  },

  getMarketHistoricalByPair({ commit, state }, pair) {
    const diff = 4 * 60 * 60 * 1000;
    const endDate = +new Date();
    const startDate = +new Date(endDate - diff);
    const params = `?exchange=gdax&endDate=${endDate}&startDate=${startDate}`;
    const url = `${state.constants.amberdataUrl}/market/tickers/${pair}/historical${params}`;
    const options = getHeaders(state.constants);
    axios.get(url, options).then(r => {
      const p = r.data.payload;
      const value = {};
      value[pair] = p.data;

      // cache the results
      commit('UPDATE_DATA', { key: 'historicalPrices', value });
    });
  },

  getMarketHistoricalByHash({ commit, state }, hash) {
    const diff = 4 * 60 * 60 * 1000;
    const endDate = +new Date();
    const startDate = +new Date(endDate - diff);
    const params = `?exchange=gdax&endDate=${endDate}&startDate=${startDate}`;
    const url = `${state.constants.amberdataUrl}/market/tokens/prices/${hash}/historical${params}`;
    const options = getHeaders(state.constants);
    axios.get(url, options).then(r => {
      const p = r.data.payload;
      const value = {};
      value[pair] = p.data;
      console.log('getMarketHistoricalByHash', value);

      // cache the results
      commit('UPDATE_DATA', { key: 'historicalPrices', value });
    });
  },
};
