const User = require('./user')
const Event = require('./event')
const Result = require('./result')

module.exports = class Generator {
	randomize(min, max) {
		let res = Math.floor(Math.random() * (max - min + 1)) + min
	}
	generateResult(eventId, connectionPool) {
		let EventQuery = new Event(connectionPool)
		let ResultQuery = new Result(connectionPool)

		let event = EventQuery.getById(eventId)
		let users = event.userIds.split(',')

		let sender
		let receiver

		let i = 0
		let order = []
		while(i < users.length) {
			let res = this.randomize(0, users.length)
			if(order.indexOf(res) > -1) {
				order.push(res)
				i++
			} else {
				res = this.randomize(0, users.length)
			}
		}

		return order
	}
}
