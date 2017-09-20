const User = require('./user')
const Event = require('./event')
const Result = require('./result')

module.exports = class Generator {
  randomize (min, max) {
    let res = Math.floor(Math.random() * (max - min + 1)) + min
    return res
  }
  generateResult (eventId, connectionPool) {
    let EventQuery = new Event(connectionPool)
    let ResultQuery = new Result(connectionPool)

    EventQuery.getById(eventId).done((res) => {
      if (res) {
        let users = res[0].userIds.split(',')
        let sender
        let receiver

        let i = 0
        let orders = []
        while (i < users.length) {
          let index = this.randomize(0, users.length - 1)
          if (orders.indexOf(users[index].trim() / 1) === -1) {
            orders.push(users[index].trim() / 1)
            i++
          }
        }

        ResultQuery.deleteByEventId(res[0].id).done((response) => {
            orders.forEach((order, index) => {
                let object = {
                    sender: order,
                    receiver: (index === orders.length - 1) ? orders[0] : orders[index + 1],
                    eventId: res[0].id,
                    emailSent: false,
                    timestamp: 'now()'
                }

                ResultQuery.insert(object).done((res2) => {
                    console.log('done', object, res2)
                })
            })
            return 200
        })
      }
    })
  }
}
