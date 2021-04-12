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

module.exports = {
	logAttempts
}