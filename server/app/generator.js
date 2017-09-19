const User = require('./user')
const Event = require('./event')
const Result = require('./result')

module.exports = class Generator {
	generateResult(eventId, connectionPool) {
		let UserQuery = new User(connectionPool)
		let EventQuery = new Event(connectionPool)
		let ResultQuery = new Result(connectionPool)

		let users = UserQuery.get()
		let event = EventQuery.getById(eventId)

		let sender
		let receiver

		users.forEach((user, index) => {
			sender = user.id
			if(index < users.length) {
				receiver = users[index+1].id
			} else {
				receiver = users[0].id
			}
			ResultQuery.insert(sender,receiver,event.id)
		})

		return users
	}
}
