const Generator = require('./generator')
const Email = require('./email')

module.exports = {
  test (res, connectionPool) {
    connectionPool.query('SELECT * FROM users', function (error, results, fields) {
      if (error) throw error

      results.forEach((user) => {
        console.log(user.id)
      })
      res.send(JSON.parse(JSON.stringify(results)))
    })
  }
}
