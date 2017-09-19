module.exports = class BaseConnection {
	constructor(connectionPool) {
		this.connectionPool = connectionPool
		this.selectQuery = ''
	}
	get() {
		if(this.selectQuery !== '') {
			this.query(this.selectQuery)
		}
	}
	query(queryString) {
		this.connectionPool.query(queryString, function (error, results, fields) {
		  if (error) throw error
		  return results
		})
	}
}