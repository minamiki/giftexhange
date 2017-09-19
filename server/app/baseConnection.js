const Promise = require('promise')

module.exports = class BaseConnection {
	constructor(connectionPool) {
		this.connectionPool = connectionPool
		this.selectQuery = ''
	}
	get() {
		if(this.selectQuery !== '') {
			return this.query(this.selectQuery)
		}
	}
	query(queryString) {
		return new Promise((resolve,reject) => {
			this.connectionPool.query(queryString, function (error, results, fields) {
			  if (error) reject(error)
			  if(results) {
			  	let res =  JSON.parse(JSON.stringify(results))
			  	resolve(res)
			  } else {
			  	resolve(results)
			  }

			})
		})
	}
}