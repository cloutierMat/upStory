const db = require('../db')
require('colors')

const cragsCollection = "crags"
const routesCollection = "routes"

const notUnique = (name) => {
	console.log(`model/climbs Invalid request --- name:${name} already exists ---`.red.bgGray)
	return 400
}

//
// Load a new crag in the database
const createCrags = async (name, description) => {
	const text = description.text
	const approach = description.approach
	const rest = `climb/:${name}`
	try {
		const collection = await db.getCollection(cragsCollection)
		const isCragExist = await db.findOneByObj(collection, { name })
		if (isCragExist !== null) return notUnique(name)
		const result = await db.insertOne(collection, {
			name,
			text,
			approach,
			rest
		})
		console.log("model/climbs.js createCrags Succesfully added new crag to database".green)
		console.log(result.ops)
		return result.ops
	} catch (error) {
		console.log("model/climbs.js createClimbs Error adding new crag to database".red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

//
// Load new routes in the database
const createRoutes = async (crag, route) => {
	const name = route.name
	const grade = route.grade
	const description = route.description
	const path = `climb/${crag}/${name}`

	try {
		const crags = await db.getCollection(cragsCollection)
		const findCrag = await db.findOneByObj(crags, { name: crag })
		if (findCrag === null) {
			console.log(`model/climbs createRoutes couldn't locate crag:${crag} in database`)
			return 400
		}
		const cragId = findCrag._id
		const routes = await db.getCollection(routesCollection)
		const isRouteExist = await db.findOneByObj(routes, { name: route.name })
		if (isRouteExist !== null) return notUnique(route.name)
		const result = await db.insertOne(routes, {
			forCrags: cragId,
			name,
			grade,
			description,
			path
		})
		console.log(`model/climbs.js createRoutes Succesfully added route:'${name}' to crag:'${crag}'`.green)
		return result.ops[0]
	} catch (error) {
		console.log(`model/climbs.js createRoutes Error adding route:'${name}' to crag:'${crag}'`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getCrag = (crag) => crags[crag]

const getRoute = (crag, route) => {
	return { [route]: crags[crag][route] }
}

module.exports = {
	getCrag,
	getRoute,
	createCrags,
	createRoutes
}

async function testFunction() {
	console.log(await createCrags("acephale", { text: "acephale", approach: "not all that bad" }))
	console.log(await createRoutes("acephale", { name: "bunda", grade: "14", description: "This is the bunda descriptors" }))
	db.close()
}
// testFunction()