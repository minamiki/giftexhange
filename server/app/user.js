import BaseConnection from './baseConnection'

export default class User extends BaseConnection {
	constructor(connectionPool) {
		super(connectionPool)
		this.selectQuery = 'SELECT * FROM users'
	}
	getById(id) {
		return this.query(`${this.selectQuery} WHERE id = ${id}`)
	}
	getByName(name) {
		return this.query(`${this.selectQuery} WHERE name= '${name}'`)
	}
}