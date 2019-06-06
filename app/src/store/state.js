const constants = {
  apiUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.domain.com'
      : 'http://localhost:1001',
};

export default {
  constants,
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
};
