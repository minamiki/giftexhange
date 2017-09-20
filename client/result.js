'use strict'
import 'bootstrap'
import './scss/index.scss'
import './scss/result.scss'
import * as d3 from "d3";

const searchParams = new URLSearchParams(window.location.search); //?anything=123
const eventId = searchParams.get('eventId')

const width = 960,
    height = 500

const svg = d3.select("#main-content").append("svg")
    .attr("width", width)
    .attr("height", height)

const color = d3.scaleOrdinal(d3.schemeCategory20)

$.get(`api/report/${eventId}/match-list`)
.done((resp) => {
	// const index = resp.findIndex((item) => {
	// 	return item.senderId === 2
	// })
	const graph = {
		nodes: resp.map((item) => {
			return {
				id: item.senderId,
				name: item.senderName,
				group: item.eventId
			}
		}),
		links: resp.map((item) => {
			return {
				source: item.senderId,
				target: item.receiverId
			}
		})
	}

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.group); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

})