
/**
 * Module Dependencies
 */
const errors = require('restify-errors')

module.exports = function (server, connectionPool) {
    /**
     * GET
     */
  server.get('/exchange/test', (req, res, next) => {
    connectionPool.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error

      results.forEach((user) => {
        console.log(user.id)
      })
      res.send(JSON.parse(JSON.stringify(results)))
    })
  })
}
