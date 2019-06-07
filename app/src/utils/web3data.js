class Web3Data {
  constructor(options) {
    this.baseWsUrl = 'wss://ws.web3api.io';
    this.socket = null;
    this.apiKey = options && options.apiKey ? options.apiKey : null;
    return this;
  }

  connect(cb) {
    this.socket = new WebSocket(`${this.baseWsUrl}?x-api-key=${this.apiKey}`);

    this.socket.addEventListener('open', (e) => {
      console.log('ws connection opened');
      if (cb) cb(e);
    });
  }

  subscribe(name) {
    // TODO: params support
    const p = [`"${name}"`];
    this.socket.send(`{"jsonrpc":"2.0","id":0,"method":"subscribe","params":[${p}]}`);
  }

  on(name, callback) {
    // TODO: This is hacky! setup better listening for multiple
    this.socket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      const res = data && data.params && data.params.result ? data.params.result : {};

      // TODO: Keep track of individual subscriptions better!!
      callback(res);
    });
  }
}

export default Web3Data;
