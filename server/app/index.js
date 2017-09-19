const Generator = require('./generator')
const Email = require('./email')
const Wishlist = require('./wishlist')

/**
  * options contains:
  * - connectionPool
  * - errors
  */
module.exports = function (options) {
  let module = {}

  module.test = (req, res, next) => {
    options.connectionPool.query('SELECT * FROM users', function (error, results, fields) {
      if (error) {
        // example of throwing a http error (https://github.com/m9dfukc/node-restify-errors)
        return next(new options.errors.InternalServerError('Unable to retrieve users'))
      }

      results.forEach((user) => {
        console.log(user.id)
      })
      res.send(JSON.parse(JSON.stringify(results)))
    })
  }

  module.email = (eventId) => {
    // Create wishlists
    Wishlist.create(eventId)

    // Send Emails
    Email.process(options.connectionPool)
  }

  return module
}
