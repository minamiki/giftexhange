module.exports = function (server, connectionPool) {
  /**
   * Module Dependencies
   */
  const errors = require('restify-errors')

  const Generator = require('../app/generator')
  const Event = require('../app/event')
  const Email = require('../app/email')
  const Wishlist = require('../app/wishlist')
  const WishlistItem = require('../app/wishlistItem')

  /**
    * Test Endpoint
    */
  server.get('/exchange/test', (req, res, next) => {
    connectionPool.query('SELECT * FROM users', function (error, results, fields) {
      if (error) {
        // example of throwing a http error (https://github.com/m9dfukc/node-restify-errors)
        return next(new errors.InternalServerError('Unable to retrieve users'))
      }

      results.forEach((user) => {
        console.log(user.id)
      })
      res.send(JSON.parse(JSON.stringify(results)))
    })
  })

  /**
  * Exchange Endpoints
  */
  // Generate sender/reciever pairs and save to db
  server.get('/exchange/:eventId/generate', (req, res, next) => {
    let eventId = req.params.eventId
    if (eventId) {
      let GeneratorQuery = new Generator(connectionPool)
      let result = GeneratorQuery.generateResult(eventId, connectionPool)
      return res.send(result)
    } else {
      return next(new options.errors.InvalidArgumentError('Invalid eventId'))
    }
  })

  // send out email
  server.get('/exchange/:eventId/email', (req, res, next) => {
    let eventId = req.params.eventId
    const WishlistQuery = new Wishlist(connectionPool)
    if (eventId) {
      // Get list of user ids from the event
      let EventQuery = new Event(connectionPool)
      EventQuery.getUsers(eventId).done((result) => {
        let users = result[0].userIds.split(',').map(Number)

      // Create wishlists
        let WishlistQuery = new Wishlist(connectionPool)
        WishlistQuery.create(users, eventId).done((response) => {
          // Send Emails
          // Email.process(eventId, res, connectionPool)
          return res.send('ok')
        })
      })
    } else {
      return next(new options.errors.InvalidArgumentError('Invalid eventId'))
    }
  })

  // get event status
  server.get('/exchange/:eventId/status', (req, res, next) => {
    let eventId = req.params.eventId
  })

  /**
  * Wishlist Endpoints
  */
  // Save wishlist
  server.post('wishlist/:idHash', (req, res, next) => {
    let idHash = req.params.idHash
    let result = {
      list: []
    }
    res.send(JSON.parse(JSON.stringify(result)))
  })

  // Read wishlist
  server.get('wishlist/:id', (req, res, next) => {
    const WishlistQuery = new Wishlist(connectionPool)
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistQuery.getById(req.params.id).done((response) => {
      WishlistItemQuery.getByWishlistId(req.params.id).done((items) => {
        response[0].list = items
        res.send(response[0])
      })
    })
  })

  /**
   ** WISHLIST ITEMS
   **/
  server.get('wishlist/:id/item', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.getByWishlistId(req.params.id).done((response) => {
      res.send(response)
    })
  })

  server.get('wishlist/:id/item/:itemId', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.getById(req.params.itemId).done((response) => {
      res.send(response)
    })
  })

  server.post('wishlist/:id/item', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.create(req.params.id, req.body).done((response) => {
      req.body.id = response.insertId
      res.send(req.body)
    })
  })

  server.put('wishlist/:id/item/:itemId', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.update(req.params.itemId, req.body).done((response) => {
      WishlistItemQuery.getById(req.params.itemId).done((response) => {
        res.send(response[0])
      })
    })
  })

  server.del('wishlist/:id/item/:itemId', (req, res, next) => {
    WishlistItemQuery.delete(req.params.itemId).done((response) => {
      res.send(response)
    })
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
