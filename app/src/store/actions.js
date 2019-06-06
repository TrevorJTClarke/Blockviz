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

  toggleType({ state, commit }, id) {
    const clone = { ...state.activeTypes };
    clone[id] = !clone[id];
    console.log('clone', clone);
    commit('UPDATE_DATA', { key: 'activeTypes', value: clone });
  },
};
