'use strict'

const R = require('ramda')
const { createConnection } = require('promise-mysql')
const mysqlConnection = {
	host: process.env.DB_HOST, 
	user: process.env.DB_USER, 
	password: process.env.DB_PASS, 
	database: process.env.DB_NAME 
}
const buildQuery = require('../../lib/build-query')
const buildResponse = require('../../lib/build-response')

const table = 'resources'
const allowedFields = ['name', 'description']
const requiredFields = ['name']

module.exports = {

	//////////////////
	///// CREATE /////
	resourcesCreate: (event, context, callback) => {
		const cleanObject = require('../../lib/clean-object')
		const checkFields = require('../../lib/check-fields')

		const body = R.propOr(null, 'body', event)
		const debug = R.pathOr(null, ['queryStringParameters', 'debug'], event) == 'true'

		if (debug) console.log('body', body)

		// CHECK IF BODY EXISTS
		if (R.isEmpty(body) || body === null)
			return callback(null, buildResponse(400, {
				message: 'missing request body'
			}))

		// STRIP EMPTY VALUES
		var cleanBody = cleanObject(JSON.parse(body))
		if (debug) console.log('cleanBody', cleanBody)

		// STRIP UNALLOWED FIELDS
		const unallowedFields = checkFields.unallowed(allowedFields, cleanBody)
		cleanBody = R.omit(unallowedFields, cleanBody)
		if (debug) console.log('cleanBody', cleanBody)

		// CHECK REQUIRED FIELDS
		const missingFields = checkFields.required(requiredFields, cleanBody)
		if (R.not(R.isEmpty(missingFields)))
			return callback(null, buildResponse(400, {
				message: `missing required fields: ${R.join(', ', missingFields)}`
			}))

		// OPEN DB CONNECTION
		var connection
		createConnection(mysqlConnection).then(conn => {
			// QUERY
			connection = conn
			var query = buildQuery.insert(table, cleanBody)
			if (debug) console.log('query', query)

			return connection.query(query, buildQuery.escapeValues(cleanBody))

		}).then(result => {
			// QUERY RESPONSE
			connection.end()
			if (debug) console.log('result', result)

			return callback(null, buildResponse(200, {
				message: `create ${table} success`,
				id: R.propOr(null, 'insertId', result),
				data: result
			}))
		
		}).catch(error => {
			// QUERY ERROR
			if (connection && connection.end) connection.end()
			if (debug) console.log('error', error)

			return callback(error, buildResponse(500, {
				message: 'query error',
				error: error
			}))

		}) 
	},

	///////////////
	///// GET /////
	resourcesGet: (event, context, callback) => {
		const id = R.pathOr(null, ['pathParameters', 'id'], event)
		const debug = R.pathOr(null, ['queryStringParameters', 'debug'], event) == 'true'

		if (debug) console.log('id', id)

		// OPEN DB CONNECTION
		var connection
		createConnection(mysqlConnection).then(conn => {
			// QUERY
			connection = conn
			var query = buildQuery.get(table, ['*'], {id: id})
			if (debug) console.log('query', query)

			return connection.query(query, [id])

		}).then(result => {
			// QUERY RESPONSE
			connection.end()
			if (debug) console.log('result', result)

			return callback(null, buildResponse(200, {
				message: `get ${table} success`,
				id: id,
				data: (result.isArray && result.length > 1) ? result : R.propOr(null, 0, result)
			}))
		
		}).catch(error => {
			// QUERY ERROR
			if (connection && connection.end) connection.end()
			if (debug) console.log('error', error)

			return callback(error, buildResponse(500, {
				message: 'query error',
				error: error
			}))

		})
	},

	////////////////
	///// LIST /////
	resourcesList: (event, context, callback) => {
		const debug = R.pathOr(null, ['queryStringParameters', 'debug'], event) == 'true'

		// OPEN DB CONNECTION
		var connection
		createConnection(mysqlConnection).then(conn => {
			// QUERY
			connection = conn
			var query = buildQuery.list(table, ['*'])
			if (debug) console.log('query', query)

			return connection.query(query)

		}).then(result => {
			// QUERY RESPONSE
			connection.end()
			if (debug) console.log('result', result)

			return callback(null, buildResponse(200, {
				message: `list ${table} success`,
				data: result
			}))
		
		}).catch(error => {
			// QUERY ERROR
			if (connection && connection.end) connection.end()
			if (debug) console.log('error', error)

			return callback(error, buildResponse(500, {
				message: 'query error',
				error: error
			}))

		}) 
	},

	//////////////////
	///// UPDATE /////
	resourcesUpdate: (event, context, callback) => {
		const cleanObject = require('../../lib/clean-object')
		const checkFields = require('../../lib/check-fields')
		
		const body = R.propOr(null, 'body', event)
		const id = R.pathOr(null, ['pathParameters', 'id'], event)
		const debug = R.pathOr(null, ['queryStringParameters', 'debug'], event) == 'true'

		if (debug) console.log('body', body)
		if (debug) console.log('id', id)

		// CHECK IF BODY EXISTS
		if (R.isEmpty(body) || body === null)
			return callback(null, buildResponse(400, {
				message: 'missing request body'
			}))

		// STRIP EMPTY VALUES
		var cleanBody = cleanObject(JSON.parse(body))
		if (debug) console.log('cleanBody', cleanBody)

		// STRIP UNALLOWED FIELDS
		const unallowedFields = checkFields.unallowed(allowedFields, cleanBody)
		cleanBody = R.omit(unallowedFields, cleanBody)
		if (debug) console.log('cleanBody', cleanBody)

		// OPEN DB CONNECTION
		var connection
		createConnection(mysqlConnection).then(conn => {
			// QUERY
			connection = conn
			var query = buildQuery.update(table, cleanBody, {id: id})
			if (debug) console.log('query', query)

			return connection.query(query, buildQuery.escapeValues(cleanBody))

		}).then(result => {
			// QUERY RESPONSE
			connection.end()
			if (debug) console.log('result', result)

			return callback(null, buildResponse(200, {
				message: `update ${table} success`,
				id: id,
				data: result
			}))
		
		}).catch(error => {
			// QUERY ERROR
			if (connection && connection.end) connection.end()
			if (debug) console.log('error', error)

			return callback(error, buildResponse(500, {
				message: 'query error',
				error: error
			}))

		}) 
	},

	//////////////////
	///// DELETE /////
	resourcesDelete: (event, context, callback) => {
		const id = R.pathOr(null, ['pathParameters', 'id'], event)
		const debug = R.pathOr(null, ['queryStringParameters', 'debug'], event) == 'true'

		//console.log('debug:', debug)
		if (debug) console.log('id', id)

		// OPEN DB CONNECTION
		var connection
		createConnection(mysqlConnection).then(conn => {
			// QUERY
			connection = conn
			var query = buildQuery.delete(table, {id: id})
			if (debug) console.log('query', query)

			return connection.query(query, [id])

		}).then(result => {
			// QUERY RESPONSE
			connection.end()
			if (debug) console.log('result', result)

			return callback(null, buildResponse(200, {
				message: `delete ${table} success`,
				id: R.propOr(null, 'insertId', result),
				data: result
			}))
		
		}).catch(error => {
			// QUERY ERROR
			if (connection && connection.end) connection.end()
			if (debug) console.log('error', error)

			return callback(error, buildResponse(500, {
				message: 'query error',
				error: error
			}))

		}) 
	}

}
