// import fs from 'fs'
import axios from 'axios'

const blockchainId = '1c9c969065fcd1cf'
const baseUrl = `https://web3api.io/api/v1`
const baseOptions = {
  headers: {
    'x-api-key': process.env.AMBERDATA_API_KEY || '',
    'x-amberdata-blockchain-id': blockchainId
  }
}

const getQueryFromObject = obj => {
  let q

  for (const k in obj) {
    if (k && obj[k]) q += `${k}=${obj[k]}&`
  }
  return `?${q}`
}

class AmberdataProvider {
  constructor() {
    return this
  }

  getBlockTransactions(num, query) {
    const queryStr = getQueryFromObject(query)
    const url = `${baseUrl}/blocks/${num}/transactions${queryStr}`

    return axios.get(url, baseOptions)
      .then(res => {
        const data = res.data
        if (!data || !data.payload) return {}
        return data.payload
      })
      .catch(() => {
        return {}
      })
  }
}

export default AmberdataProvider
