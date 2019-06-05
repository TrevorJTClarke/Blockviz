import fs from 'fs'
import stream from 'stream'
import D3Node from 'd3-node'

class VisualsProvider {
  constructor() {
    return this
  }

  blockBurst(options) {
    // Dimensions of sunburst.
    var width = 400;
    var height = 300;
    var radius = Math.min(width, height) / 2;
    const d3n = new D3Node()
    const d = d3n.createSVG(width, height)

    // Mapping of step names to colors.
    var colors = {
      "root": "#5687d1",
      "end": "#7b615c",
      "top": "#de783b",
      "top2": "#6ab975",
      "end2": "#a173d1",
      "end": "#bbbbbb"
    };

    // Total size of all segments; we set this later, after loading the data.
    var totalSize = 0;

    var vis = d
      .append("svg:g")
      .attr("id", "container")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var partition = d3n.d3.partition()
        .size([2 * Math.PI, radius * radius]);

    var arc = d3n.d3.arc()
        .startAngle(function(d) { return d.x0; })
        .endAngle(function(d) { return d.x1; })
        .innerRadius(function(d) { return Math.sqrt(d.y0); })
        .outerRadius(function(d) { return Math.sqrt(d.y1); });

    // Main function to draw and set up the visualization, once we have the data.
    function createVisualization(json) {
      // Bounding circle underneath the sunburst, to make it easier to detect
      // when the mouse leaves the parent g.
      vis.append("svg:circle")
        .attr("r", radius)
        .style("fill", '#f9f9f9')
        .style("opacity", 1);

      // Turn the data into a d3 hierarchy and calculate the sums.
      var root = d3n.d3.hierarchy(json)
        .sum(function(d) {
          return d.size;
        })
        .sort(function(a, b) {
          return b.value - a.value;
        });

      // For efficiency, filter nodes to keep only those large enough to see.
      var nodes = partition(root).descendants()
          .filter(function(d) {
              return (d.x1 - d.x0 > 0.005); // 0.005 radians = 0.29 degrees
          });

      var path = vis.data([json]).selectAll("path")
        .data(nodes)
        .enter().append("svg:path")
        .attr("display", function(d) {
          return d.depth ? null : "none";
        })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", function(d) {
          return colors[d.data.name];
        })
        .style("opacity", 1)
      // .on("mouseover", mouseover);

      // Add the mouseleave handler to the bounding circle.
      // d3n.select("#container").on("mouseleave", mouseleave);

      // Get total size of the tree = value of root node from partition.
      totalSize = path.datum().value;
    };

    createVisualization({
      name: 'root',
      size: 1,
      value: 20,
      children: [{
        name: 'top',
        size: 1,
        value: 13,
        children: [{
          name: 'child',
          value: 4,
          children: [{
            name: 'end',
            value: 1,
            size: 1
          }]
        }]
      }, {
        name: 'top2',
        size: 1,
        value: 7,
        children: [{
          name: 'child2',
          size: 1,
          value: 2,
          children: [{
            name: 'end2',
            value: 1,
            size: 1
          }]
        }]
      }]
    });


    return d3n.svgString()
  }
}

export default VisualsProvider
