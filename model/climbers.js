const db = require('./db')
require('colors')

const climberCollection = "climbers"

const notUnique = (name) => {
	console.log(`model/climbers Invalid request --- name:${name} already exists ---`.red.bgGray)
	return 400
}

const newClimber = (name) => {
	return {
		name: name,
		grade: 8,
		status: "happy",
	}
}

const createClimber = async (name) => {
	try {
		const collection = await db.getCollection(climberCollection) // get collection
		const findClimber = await db.findOneByObj(collection, { name }) // find if name exist in collection
		if (findClimber !== null) return notUnique(name) // return Invalid request if name isn't unique
		const result = await db.insertOne(collection, newClimber(name)) // create new entry in the database
		console.log("model/climbers.js createClimber Succesfully added new climber to database".green)
		console.log(result.ops)
		return result.ops
	} catch (error) {
		console.log("model/climbers.js createClimber Failed to create a new climber".red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getDetails = async (name) => {
	try {
		const collection = await db.getCollection(climberCollection)
		let result = await db.findOneByObj(collection, { name })
		if (result === null) return invalidRequest(name)
		console.log(`model/climbers.js getDetails Succesfully loaded climber from database ${result._id}`.green)
		return result
	} catch (error) {
		console.log("model/climbers.js getDetails Failed to load climber from database".red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getShort = async (name) => {
	try {
		const climber = await getDetails(name)
		if (!Number.isNaN(climber)) return climber
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

const getId = async (name) => {
	try {
		const climber = await getDetails(name)
		if (Number.isNaN(climber)) return climber
		return climber._id
	} catch (error) {
		console.log("model/climbers.js getId Failed to load climber from database".red.bgCyan)
		console.log(`${error}`.red)
		return 500
	}
}

const climbers = {
	createClimber,
	getDetails,
	getShort,
	getId
}

module.exports = climbers
