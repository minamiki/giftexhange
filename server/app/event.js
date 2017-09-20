const BaseConnection = require('./baseConnection')
const Promise = require('promise')

module.exports = class Event extends BaseConnection {
  constructor (connectionPool) {
    super(connectionPool)
    this.selectQuery = 'SELECT * FROM event'
  }
  getUsers (id) {
    return this.query(`SELECT userIds FROM event WHERE id=${id}`)
  }
  getById (id) {
    return this.query(`${this.selectQuery} WHERE id = ${id}`)
  }
  getByName (name) {
    return this.query(`${this.selectQuery} WHERE name= '${name}'`)
  }
}
