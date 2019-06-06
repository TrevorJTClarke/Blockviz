const constants = {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.domain.com'
      : 'http://localhost:1001',
  apiKey: window.AMBERDATA_API_KEY || 'UAK000000000000000000000000demo0001',
};

export default {
  constants,
  wsActive: false,
  // wsActive: true,
  activeRange: [],
  activeTypes: {
    data: true,
    value: true,
    transactions: true,
    tokenTransfers: true,
    functions: true,
    logs: true,
    ether: true,
  },
  currentBlock: {},
};
