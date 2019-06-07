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

export function formatBlock(txns) {
  const children = []
  // Basics
  const functions = txns.filter(t => t.functions)
  const logs = txns.filter(t => t.logs)
  const tokenTransfers = txns.filter(t => t.tokenTransfers)
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
  const functions = txns.filter(t => t.functions)
  const logs = txns.filter(t => t.logs)
  const tokenTransfers = txns.filter(t => t.tokenTransfers)
  const ether = txns.filter(t => t.value !== '0')
  let totalEther = 0

  ether.forEach(e => totalEther += parseInt(e.value, 10))

  return {
    number: txns[0] && txns[0].blockNumber ? parseInt(txns[0].blockNumber, 10) : null,
    totalTransactions: txns.length,
    totalFunctions: functions.length,
    totalLogs: logs.length,
    totalTokenTransfers: logs.length,
    totalEther,
  }
}
