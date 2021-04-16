const db = require('./db')
const climbers = require('./climbers')
const climbs = require('./climbs')

const attemptsCollection = "attempts"

const isSuccess = () => Math.floor(Math.random() * 2)

const logAttempts = async (climber, route) => {
	try {
		const routeId = await climbs.getRouteId(route)
		const climberId = await climbers.getId(climber)
		const attempts = await db.getCollection(attemptsCollection)
		const success = !!isSuccess()
		const result = await attempts.insertOne({
			forRoutes: routeId,
			forClimber: climberId,
			timestamp: new Date(),
			success
		})
		console.log(`model/attempts.js logAttempts Succesfully logged '${climber}'s' attempt to climb '${route}' result:${result.ops[0]._id}'`.green)
		return result.ops[0]
	} catch (error) {
		console.log(`model/attempts.js logAttempts Error logging '${climber}'s' attempt at '${route}'`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getOneByClimber = async (route, climber) => {
	try {
		const routeId = await climbs.getRouteId(route)
		const climberId = await climbers.getId(climber)
		const collection = await db.getCollection(attemptsCollection)
		const cursor = collection.find({ forRoutes: routeId, forClimber: climberId }, { projection: { "timestamp": 1, "success": 1, "_id": 0 } })
		const result = await cursor.toArray()
		const success = !!result.find(elem => elem.success == true)
		const attempt = result.length
		const reccord = { success, attempt }
		console.log(reccord)
		console.log(`attempts.js getOneByClimbers sucessfully loaded ${climber}'s attempt at ${route}`.green)
		return reccord
	} catch (error) {
		console.log(`model/attempts.js getOneByClimber Error loading attempts for ${route} by ${climber}`.red)
	}
}

module.exports = {
	logAttempts,
	getOneByClimber
}