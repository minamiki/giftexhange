module.exports = function (server, connectionPool) {
  /**
   * Module Dependencies
   */
  const errors = require('restify-errors')
  const GiftExchange = require('../app/index')({
    connectionPool, errors
  })

  /**
    * Test Endpoint
    */
  server.get('/exchange/test', (req, res, next) => {
    GiftExchange.test(req, res, next)
  })

  /**
  * Exchange Endpoints
  */
  // Generate sender/reciever pairs and save to db
  server.post('/exchange/generate', (req, res, next) => {

  })

  // send out email
  server.post('/exchange/email', (req, res, next) => {
    GiftExchange.email(req, res, next)
  })

  // get event status
  server.get('/exchange/status/:eventId', (req, res, next) => {
    let eventId = req.params.eventId
  })

  /**
  * Wishlist Endpoints
  */
  // Save wishlist
  server.post('wishlist/:idHash', (req, res, next) => {
    let idHash = req.params.idHash
  })

  // Read wishlist
  server.get('wishlist/:idHash', (req, res, next) => {
    let idHash = req.params.idHash
  })

  /**
  * Event Endpoints
  */
  // Create Event
  server.post('event', (req, res, next) => {

  })

  /**
  * User Endpoints
  */
  // Create user
  server.post('user', (req, res, next) => {

  })

  // Get user
  server.get('user/:id', (req, res, next) => {
    let id = req.params.id
  })
}
