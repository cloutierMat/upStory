const { isNumber } = require("lodash")
const db = require("./db")
const climberCollection = "climbers"

const invalidRequest = (name) => {
	console.log(`model/climbers Invalid request --- name:${name} ---`.red.bgCyan)
	return 400
}

const newClimber = (name) => {
	return {
		name: name,
		grade: 8,
		status: "happy",
		ascents: [],
		attempts: []
	}
}

const createClimber = async (name) => {
	try {
		const collection = await db.getCollection(climberCollection) // get collection
		let result = await db.findOneByObj(collection, { name: name }) // find if name exist in collection
		if (result !== null) return invalidRequest(name) // return Invalid request if name isn't unique
		result = await db.insertOne(collection, newClimber(name)) // create new entry in the database
		console.log("model/climbers.js createClimber Succesfully added new climber to database".green)
		console.log(result.ops)
		return result.ops
	} catch (error) {
		console.log("model/climbers.js createClimber Failed to create a new climber".red.bgCyan)
		console.log(`${error}`.red)
		return 500
	}
}

const getDetails = async (name) => {
	try {
		const collection = await db.getCollection(climberCollection)
		let result = await db.findOneByObj(collection, { name: name })
		if (result === null) return invalidRequest(name)
		console.log("model/climbers.js getDetails Succesfully loaded climber from database".green)
		console.log(result)
		return result
	} catch (error) {
		console.log("model/climbers.js getDetails Failed to load climber from database".red.bgCyan)
		console.log(`${error}`.red)
		return 500
	}
}

const getShort = async (name) => {
	try {
		const climber = await getDetails(name)
		if (isNumber(climber)) return climber
		return {
			name: climber.name,
			grade: climber.grade,
			status: climber.status
		}
	} catch (error) {
		console.log("model/climbers.js getShorts Failed to load climber from database".red.bgCyan)
		console.log(`${error}`.red)
		return 500
	}
}

const climbers = {
	createClimber,
	getDetails,
	getShort,
}

module.exports = climbers

// createClimber("mat")

