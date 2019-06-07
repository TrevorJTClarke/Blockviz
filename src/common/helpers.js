import Big from 'big.js'

const genesisAddress = '0x0000000000000000000000000000000000000000'

export function getEnv(name, defaultValue) {
  return process.env[name] || defaultValue
}

// Needs to export in a format readable by d3.js
// {
//   name: 'root',
//   size: 1,
//   children: []
// }
const getNode = (name, children, size) => {
  return {
    name,
    children,
    size: size || children.length,
  }
}

const formatNodeChildren = childData => {
  const childs = []
  // map all available data to node style
  Object.keys(childData).map(c => {
    const k = getNode(c, childData[c], childData[c].length)
    if (k) childs.push(k)
  })

  return childs
}

const formatIndividualChildren = (name, childrens, formatter) => {
  const childs = []
  // map all available data to node style
  childrens.map(c => {
    let k
    if (formatter) {
      k = getNode(name, [], formatter(c))
    } else {
      const val = parseFloat(c.value || c.amount) / 1e18
      const a = val < 1 ? 1 : val
      k = getNode(name, [], val || 1)
      // const k = getNode(name, [], 1)
    }
    if (k) childs.push(k)
  })

  return childs
}

const getTxnsChildArrayByType = (txns, type) => {
  let arr = []

  txns.forEach(t => {
    if (t[type]) arr = arr.concat(t[type])
  })

  return arr
}

const getTxnsChildFieldsByType = (txns, type) => {
  let arr = []

  txns.forEach(t => {
    if (t[type] && t[type] !== 'null') arr.push(t[type])
  })

  return arr
}

export function formatBlock(txns) {
  const children = []
  // Basics
  const functions = txns.filter(t => t.functions)
  const logs = txns.filter(t => t.logs)
  const tokenTransfers = txns.filter(t => t.tokenTransfers)
  // TODO: This is the REAL values...
  // const functions = getTxnsChildArrayByType(txns, 'functions')
  // const logs = getTxnsChildArrayByType(txns, 'logs')
  // const tokenTransfers = getTxnsChildArrayByType(txns, 'tokenTransfers')
  const ether = txns.filter(t => t.value !== '0')

  // level 2
  const fmtFns = formatIndividualChildren('functions', functions)
  const fmtTkns = formatIndividualChildren('tokenTransfers', tokenTransfers)
  const fmtLogs = formatIndividualChildren('logs', logs, l => l && l.topics ? l.topics.length : 1)
  const fmtEth = formatIndividualChildren('ether', ether)

  // level 1
  const fmtTxns = formatNodeChildren({
    functions: fmtFns,
    logs: fmtLogs,
    ether: fmtEth,
    tokenTransfers: fmtTkns
  })
  const data = getNode('data', fmtTxns, txns.length)
  const fmtValue = formatNodeChildren({ ether, tokenTransfers })
  const value = getNode('value', fmtValue, fmtValue.length)

  if (data) children.push(data)
  if (value) children.push(value)

  return getNode('root', children)
}

export function formatTotals(txns) {
  const functions = getTxnsChildArrayByType(txns, 'functions')
  const logs = getTxnsChildArrayByType(txns, 'logs')
  const tokenTransfers = getTxnsChildArrayByType(txns, 'tokenTransfers')
  const newContracts = getTxnsChildFieldsByType(txns, 'contractAddress')
  const ether = txns.filter(t => t.value !== '0')

  // Mapping of token address and total amounts
  const tokens = {}
  tokenTransfers.forEach(tkn => {
    const prev = tokens[tkn.tokenAddress] && tokens[tkn.tokenAddress].amount ? new Big(tokens[tkn.tokenAddress].amount) : new Big(0)
    // if we see burn "TO" address, lets subtract
    if (tkn.tokenAddress === genesisAddress) {
      tokens[tkn.tokenAddress] = prev.minus(tkn.amount)
    } else if (prev.plus) {
      tokens[tkn.tokenAddress] = prev.plus(tkn.amount)
    }
  })
  // Now format those tokens with decimals
  // NOTE: This is hacked since I dont have decimals in payload, default to 1e18
  Object.keys(tokens).forEach(v => {
    tokens[v] = new Big(tokens[v]).div(1e18)
  })

  let totalFunctionsValue = new Big(0)
  functions.forEach(fn => {
    totalFunctionsValue = totalFunctionsValue.plus(fn.value)
  })
  // Format to Ether
  totalFunctionsValue = totalFunctionsValue.div(1e18)

  let totalEther = new Big(0)
  ether.forEach(eth => {
    totalEther = totalEther.plus(eth.value)
  })
  // Format to Ether
  totalEther = totalEther.div(1e18)

  // const ethers = {
  //   // TODO: total + volume? (amt of txns)
  // }
  // const pieData = {
  //   // totalether + total tokens + value within functions
  // }

  return {
    number: txns[0] && txns[0].blockNumber ? parseInt(txns[0].blockNumber, 10) : null,
    totalTransactions: txns.length,
    totalFunctions: functions.length,
    totalFunctionsValue,
    totalLogs: logs.length,
    totalTokenTransfers: logs.length,
    tokens,
    totalEther,
    totalEtherTxns: ether.length,
    newContracts,
    totalNewContracts: newContracts.length,
  }
}
