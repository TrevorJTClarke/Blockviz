import fs from 'fs'
import stream from 'stream'
import D3Node from 'd3-node'
import { formatBlock } from '../../common/helpers'

// Mapping of names to colors
const colors = {
  data: '#0B1F65',
  value: '#D7A449',
  tokenTransfers: '#D7A449',
  functions: '#DB3F29',
  ether: '#414552',
  logs: '#1DC690',
}

class VisualsProvider {
  constructor() {
    return this
  }

  blockBurst(data, options) {
    // Dimensions of sunburst
    const width = options.width || 400
    const height = options.height || 400
    const stroke = 6
    const radius = Math.min(width - stroke, height - stroke) / 2
    const d3n = new D3Node()
    const d = d3n.createSVG(width, height)
    const json = formatBlock(data)

    // Total size of all segments; we set this later, after loading the data.
    let totalSize = 0

    d.attr('id', `block-${options.blockNumber}`)

    const vis = d
      .append('g')
      .attr('id', 'burst-container')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const partition = d3n.d3.partition()
        .size([2 * Math.PI, radius * radius]);

    const arc = d3n.d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .innerRadius(d => Math.sqrt(d.y0))
        .outerRadius(d => Math.sqrt(d.y1));

    // Main function to draw and set up the visualization
    vis.append('circle')
      .attr('r', radius)
      .style('fill', '#f9f9f9')
      .style('stroke', '#f9f9f9')
      .style('strokeWidth', 3)
      .attr('id', 'circle-base')
      .style('opacity', 1);

    // Turn the data into a d3 hierarchy and calculate the sums.
    const root = d3n.d3.hierarchy(json)
      .sum(d => d.size)
      .sort((a, b) => b.value - a.value);

    // For efficiency, filter nodes to keep only those large enough to see.
    const nodes = partition(root).descendants()
      .filter(function(d) {
        return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
      });

    const path = vis.data([json]).selectAll('path')
      .data(nodes)
      .enter().append('path')
      .attr('display', d => d.depth ? null : 'none')
      .attr('d', arc)
      .attr('fill-rule', 'evenodd')
      .style('fill', d => colors[d.data.name])
      .attr('id', d => `p-type-${d.data.name}`)
      .style('stroke', '#fff')
      .style('opacity', 1)

    // Get total size of the tree = value of root node from partition.
    totalSize = path.datum().value

    return d3n.svgString()
  }
}

export default VisualsProvider
