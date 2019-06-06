import axios from 'axios';

export default {
  getBlockVisual({ state }, id) {
    const url = `${state.constants.apiUrl}/visual/${id}`;
    return axios
      .get(url)
      .then(r => r.data);
  },

  setRange({ commit }, { start, end }) {
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
};
