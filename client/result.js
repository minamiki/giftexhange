'use strict'
import 'bootstrap'
import './scss/index.scss'
import './scss/result.scss'
import * as d3 from 'd3'

const searchParams = new URLSearchParams(window.location.search) //?anything=123
const eventId = searchParams.get('eventId')
const userId = searchParams.get('userId')
const url = eventId ? `api/report/${eventId}/match-list` : 'api/report/match-list'
const strength = eventId ? -1000 : -100
let path
let node

const width = 960,
		height = 500

const svg = d3.select('#main-content').append('svg')
	.attr('width', width)
	.attr('height', height)

const color = d3.scaleOrdinal(d3.schemeCategory20)

const simulation = d3.forceSimulation()
	.force('link', d3.forceLink().id(function(d) { return d.id }))
	.force('charge', d3.forceManyBody().strength(strength))
	.force('center', d3.forceCenter(width / 2, height / 2))

const dblclicked = (d) => {
	window.location = `wishlist?id=${d.wishlistId}${userId ? `&userId=${userId}` : ''}`
}

const dragstarted = (d) => {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart()
	d.fx = d.x
	d.fy = d.y
}

const dragged = (d) => {
	d.fx = d3.event.x
	d.fy = d3.event.y
}

const dragended = (d) => {
	if (!d3.event.active) {
		simulation.alphaTarget(0)
	}
	d.fx = null
	d.fy = null
}

const ticked = () => {
	path.attr('d', function(d) {
		var dx = d.target.x - d.source.x,
			dy = d.target.y - d.source.y,
			dr = Math.sqrt(dx * dx + dy * dy);
		return 'M' + 
			d.source.x + ',' + 
			d.source.y + 'A' + 
			dr + ',' + dr + ' 0 0,1 ' + 
			d.target.x + ',' + 
			d.target.y;
	})

	node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')' })
}

$.get(url).done((resp) => {
	const graph = {
		nodes: resp.map((item) => {
			return {
				id: `${item.eventId}_${item.senderId}`,
				name: item.receiverName,
				count: item.wishlist_count,
				group: item.eventId,
				wishlistId: item.wishlistId
			}
		}),
		links: resp.map((item) => {
			return {
				source: `${item.eventId}_${item.senderId}`,
				target: `${item.eventId}_${item.receiverId}`
			}
		})
	}

	// build the arrow.
	svg.append('svg:defs').selectAll('marker')
		.data(['end'])      // Different link/path types can be defined here
		.enter().append('svg:marker')    // This section adds in the arrows
			.attr('id', String)
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 15)
			.attr('refY', -1.5)
			.attr('markerWidth', 6)
			.attr('markerHeight', 6)
			.attr('orient', 'auto')
			.append('svg:path')
				.attr('d', 'M0,-5L10,0L0,5')
				.style('fill', '#1997c6')

	// add the links and the arrows
	path = svg.append('svg:g').selectAll('path')
		.data(graph.links)
		.enter().append('svg:path')
			.attr('class', 'link')
			.attr('marker-end', 'url(#end)')

	node = svg.append('g')
		.attr('class', 'nodes')
		.selectAll('.node')
		.data(graph.nodes)
		.enter().append('g')
			.attr('class', 'node')

	node.append('circle')
		.attr('r', 5)
		.attr('fill', function(d) { return color(d.group) })
			.on('dblclick', dblclicked)
			.call(d3.drag()
				.on('start', dragstarted)
				.on('drag', dragged)
				.on('end', dragended))

	node.append('text')
		.attr('x', 12)
		.attr('dy', '.35em')
		.text(function(d) { return `${d.name} (${d.count})` })

	simulation
		.nodes(graph.nodes)
		.on('tick', ticked)

	simulation.force('link')
		.links(graph.links)
})