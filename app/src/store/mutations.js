export default {
  /* eslint no-param-reassign:0 */
  UPDATE_DATA(state, { key, value }) {
    state[key] = value;
  },

  /* eslint no-param-reassign:0 */
  UPDATE_CACHE(state, { id, data }) {
    state.cache[id] = data;
  },
};
