const BaseConnection = require('./baseConnection')
const Promise = require('promise')

module.exports = class Wishlist extends BaseConnection {
	getById(id) {
		return this.query(`SELECT *, 
			(SELECT u.fullName FROM users u WHERE u.id = wl.userId) as userName
			FROM wishlist wl WHERE wl.id = ${id}`)
	}
	create(eventId, object) {
	}
}