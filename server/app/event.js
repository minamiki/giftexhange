import BaseConnection from './baseConnection'

export default class Event extends BaseConnection {
	constructor(connectionPool) {
		super(connectionPool)
		this.selectQuery = 'SELECT * FROM events'
	}
	getById(id) {
		return this.query(`${this.selectQuery} WHERE id = ${id}`)
	}
	getByName(name) {
		return this.query(`${this.selectQuery} WHERE name= '${name}'`)
	}
}