const path = require('path')
const fs = require('fs')
const config = require('../config')
const sendmail = require('sendmail')({
  devPort: config.email.port,
  devHost: config.email.host
})
const Handlebars = require('handlebars')
const emailTemplate = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../emailTemplates/template.hbs'), 'utf8'))

module.exports = {

  process (eventId, res, connectionPool) {
    connectionPool.query(`SELECT
        us.id AS senderId, us.fullName AS senderName, us.email AS senderEmail,
        ur.id AS receiverId, ur.fullName AS receiverName, ur.email AS receiverEmail,
        r.eventId
        FROM result AS r
        INNER JOIN users AS us ON r.senderId = us.id
        INNER JOIN users AS ur ON r.receiverId = ur.id
        WHERE r.eventId = ${eventId}`, function (error, results, fields) {
      if (error) {
        return next(new options.errors.InternalServerError(`Unable to retrieve event with id: ${eventId}`))
      }

      if (results.length > 0) {
        results.forEach((result) => {
          sendmail({
            from: 'Gift Exchange <gift-exchange@tremorvideodsp.com>',
            to: `${result.senderName} <${result.senderEmail}>`,
            subject: 'Gift Exchange!',
            html: emailTemplate({
              baseImagePath: config.email.asset_base_url,
              senderName: result.senderName,
              receiverName: result.receiverName,
              receiverWishlistURL: `${config.base_url}/wishlist?id=`,
              senderWishlistURL: `${config.base_url}/wishlist?id=`
            })
          }, function (err, reply) {
            console.log(err && err.stack)
            console.dir(reply)
          })
        })
      }
      res.send('ok')
    })
  }
}
