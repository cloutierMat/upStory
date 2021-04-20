const db = require('./db')
const climbers = require('./climbers')
const climbs = require('./climbs')

const attemptsCollection = "attempts"

const getRandomSuccess = (climberGrade, routeDifficulty) => {
	const randomNumber = () => Math.random()
	let userModifier = randomNumber() * 2 - 1 // will return a float with range -1 to 1
	let environmentalModifier = randomNumber() * 4 - 2 // will return a float with range -2 to 2

	console.log(`climberGrade: ${climberGrade}, routeDifficulty: ${routeDifficulty}`)
	if (climberGrade >= routeDifficulty + userModifier + environmentalModifier)
		return true
	else
		return false

}

const logAttempts = async (climber, route) => {
	try {
		route = await climbs.getRouteInfo(route, {})
		climber = await climbers.getDetails(climber)
		console.log("route: ")
		console.log(route)
		console.log("climber")
		console.log(climber)
		const attempts = await db.getCollection(attemptsCollection)
		const success = getRandomSuccess(climber.grade, route.grade)
		const result = await attempts.insertOne({
			forRoutes: route._id,
			forClimber: climber._id,
			timestamp: new Date(),
			success
		})
		console.log(`model/attempts.js logAttempts Succesfully logged '${climber.name}'s' attempt to climb '${route.name}' result:${result.ops[0]._id}'`.green)
		return await getOneByClimber(route.name, climber.name)
	} catch (error) {
		console.log(`model/attempts.js logAttempts Error logging '${climber.name}'s' attempt at '${route.name}'`.red.bgGray)
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