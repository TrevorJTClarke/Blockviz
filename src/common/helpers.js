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
    size: size || children.length,
    children: children || []
  }
}

// const formatChildrenFromKey

const formatTxnChildren = childData => {
  const childs = []
  // map all available data to node style
  Object.keys(childData).map(c => {
    const k = getNode(c, [], childData[c].length)
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

  // level 1
  const fmtTxns = formatTxnChildren({ functions, logs, tokenTransfers, ether })
  const transactions = getNode('transactions', fmtTxns, txns.length)

  if (transactions) children.push(transactions)
  // if (functions) children.push(functions)
  // if (logs) children.push(logs)
  // if (tokenTransfers) children.push(tokenTransfers)
  // if (ether) children.push(ether)

  return getNode('root', children)
}
