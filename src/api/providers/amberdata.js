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

const apiUrl = process.env.NODE_ENV === 'production'
    ? process.env.CDN_PUBLIC_URL || 'https://cdn.amberdata.io/v1'
    : 'http://localhost:4321/v1'

const getAssetPath = hash => {
  return `${apiUrl}/assets/${hash}.png`
}

const getShortUrl = hash => {
  return `https://wb3.io/${hash}`
}

const getExplorerUrl = hash => {
  return `https://amberdata.io/addresses/${hash}`
}

class AmberdataProvider {
  constructor() {
    return this
  }

  getAddress(hash) {
    const url = `${baseUrl}/addresses/${hash}/information`
    return axios.get(url, baseOptions)
      .then(res => {
        const data = res.data
        if (!data || !data.payload) return {}
        return {
          ...data.payload,
          assetPath: getAssetPath(hash),
          shortUrl: getShortUrl(hash),
          siteUrl: getExplorerUrl(hash),
        }
      })
      .catch(() => {
        return {}
      })
  }
}

export default AmberdataProvider
