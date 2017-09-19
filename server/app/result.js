const BaseConnection = require('./baseConnection')

module.exports = class Event extends BaseConnection {
	constructor(connectionPool) {
		super(connectionPool)
		this.selectQuery = 'SELECT * FROM result'
		this.insertQuery = ''
	}
	getById(id) {
		return this.query(`${this.selectQuery} WHERE id = ${id}`)
	}

	insert(sender, receiver, eventId) {
		let query = `INSERT INTO result (sender, receiver, eventId, emailSent) VALUES (${sender}, ${receiver}, ${eventId}, false)`

		this.query(query)
	}
}