import * as d3 from "d3";

const width = 960;
const height = 500;
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

export function drawChart(data) {
  console.log("drawing chart");
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = height - margin.left - margin.right;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const tree = d3
    .tree()
    .separation((a, b) => (a.parent === b.parent ? 1 : 0.5))
    .size([innerWidth, innerHeight]);

  const body = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const nodes = d3.hierarchy(data[5], d => d.children); // just Abe Simpson

  const treeNodes = tree(nodes);

  const link = body
    .selectAll(".link")
    .data(treeNodes.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", elbow);

  const node = svg
    .selectAll(".node")
    .data(treeNodes.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y + 50},${d.x})`);

  node
    .append("text")
    .attr("class", "name")
    .attr("x", 8)
    .attr("y", -6)
    .text(d => d.data.Name);

  node
    .append("text")
    .attr("x", 8)
    .attr("y", 8)
    .attr("dy", ".71em")
    .attr("class", "about lifespan")
    .text(d => `Born ${d.data.Birth}`);

  node
    .append("text")
    .attr("x", 8)
    .attr("y", 8)
    .attr("dy", "1.86em")
    .attr("class", "about gender")
    .text(d => `Gender: ${d.data.Gender}`);
}

function elbow(d, i) {
  return `M${d.source.y},${d.source.x}H${d.target.y}V${d.target.x}${
    d.target.children ? "" : `h${margin.right}`
  }`;
}
