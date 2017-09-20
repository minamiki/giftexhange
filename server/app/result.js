const BaseConnection = require('./baseConnection')
const User = require('./user')

module.exports = class Event extends BaseConnection {
	constructor(connectionPool) {
		super(connectionPool)
		this.selectQuery = 'SELECT rs.*, s.fullName as senderName, r.fullName as receiverName, (SELECT COUNT(wl.id) FROM wishlist_items wl where wl.wishlistId in (SELECT id from wishlist w where w.eventId = rs.eventId and w.userId = rs.receiverId)) as wishlist_count FROM result rs inner join users s on s.id = rs.senderId inner join users r on r.id = rs.receiverId'
		this.insertQuery = ''
		this.UserQuery = new User(connectionPool)
	}

	getByEventId(eventId) {
		return this.query(`${this.selectQuery} WHERE rs.eventId=${eventId}`)
	}

	getById(id) {
		return this.query(`${this.selectQuery} WHERE rs.id = ${id}`)
	}

	deleteByEventId(id) {
		return this.query(`DELETE FROM result WHERE eventId = ${id}`)
	}

	insert(object) {
		let query = `INSERT INTO result (senderId, receiverId, eventId, emailSent) VALUES (${object.sender}, ${object.receiver}, ${object.eventId}, ${object.emailSent})`
		return this.query(query)
	}
}