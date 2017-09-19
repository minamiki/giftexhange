const Wishlist = require('./wishlist')

module.exports = {

  process (req, res, next, connectionPool) {
    if (req.body.eventId) {
      let eventId = parseInt(req.body.eventId)
      connectionPool.query(`SELECT us.id, us.fullName, us.email, ur.id, ur.fullName, us.email, r.eventId
        FROM result AS r
        INNER JOIN users AS us ON r.senderId = us.id
        INNER JOIN users AS ur ON r.receiverId = ur.id
        WHERE r.eventId = 1 = ${eventId}`, function (error, results, fields) {
        if (error) {
          return next(new options.errors.InternalServerError(`Unable to retrieve event with id: ${eventId}`))
        }

        if (results.length > 0) {
          results.forEach((result) => {
            Wishlist.create(result.eventId)
          })
        }
      })
    }
  }
}
