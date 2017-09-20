const BaseConnection = require('./baseConnection')
const Promise = require('promise')

module.exports = class Wishlist extends BaseConnection {
  getById (id) {
    return this.query(`SELECT *, 
      (SELECT u.fullName FROM users u WHERE u.id = wl.userId) as userName
      FROM wishlist wl WHERE wl.id = ${id}`)
  }

  create (users, eventId) {
    if (users.length > 0) {
      let sqlInsert = ''
      users.forEach((user) => {
        sqlInsert += `(${user}, ${eventId}, now()),`
      })
      sqlInsert = sqlInsert.substring(0, sqlInsert.length - 1)
      return this.query(`INSERT INTO wishlist(userId, eventId, lastUpdate) VALUES${sqlInsert}`)
    }
  }

  updateLastModified (id) {
    return this.query(`UPDATE wishlist SET lastUpdate = now() WHERE id = ${id}`)
  }
}
