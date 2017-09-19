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

	deleteByEventId(id) {
		return this.query(`DELETE FROM result WHERE eventId = ${id}`)
	}

	insert(object) {
		let query = `INSERT INTO result (senderId, receiverId, eventId, emailSent) VALUES (${object.sender}, ${object.receiver}, ${object.eventId}, ${object.emailSent})`
		return this.query(query)
	}
}