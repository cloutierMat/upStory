const db = require('./db')
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
	const link = { [name]: `get api/climb/:${name}` }
	try {
		const collection = await db.getCollection(cragsCollection)
		const isCragExist = await db.findOneByObj(collection, { name })
		if (isCragExist !== null) return notUnique(name)
		const result = await db.insertOne(collection, {
			name,
			description,
			link
		})
		console.log(`model/climbs.js createCrags Succesfully added ${name} to database`.green)
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
	const link = {
		[name]: `get api/climb/${crag}/${name}`
	}

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
			link
		})
		console.log(`model/climbs.js createRoutes Succesfully added route:'${name}' to crag:'${crag}'`.green)
		return result.ops[0]
	} catch (error) {
		console.log(`model/climbs.js createRoutes Error adding route:'${name}' to crag:'${crag}'`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getAllCrags = async () => {
	try {
		const collection = await db.getCollection(cragsCollection)
		const cursor = collection.find({})
		const result = await cursor.toArray()
		console.log(`model/climbs.js getAllCrags Succesfully fetched all crags`.green)
		return result
	} catch (error) {
		console.log(`model/climbs.js getAllCrags Error fetching all crags from the database`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}
const getAllRoutes = async (crag) => {
	try {
		const crags = await db.getCollection(cragsCollection)
		const cragId = (await crags.findOne({ name: crag }, { projection: { _id: 1 } }))._id
		console.log(cragId)
		const routes = await db.getCollection(routesCollection)
		const cursor = await routes.find({ forCrags: cragId }, { projection: { name: 1, grade: 1, _id: 0 } }).toArray()
		// const result = await cursor.toArray()
		console.log(`model/climbs.js getAllRoutes Succesfully fetched all routes from ${crag}`.green)
		return cursor
	} catch (error) {
		console.log(`model/climbs.js getAllRoutes Error fetching all routes from the database`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getRouteId = async (name) => {
	try {
		const routes = await db.getCollection(routesCollection)
		return (await routes.findOne({ name }, { projection: { _id: 1 } }))._id
	} catch (error) {
		console.log(`model/climbs.js getId Error fetching route id from the database`.red.bgGray)
		console.log(`${error}`.red)
		return 500
	}
}

const getRouteInfo = async (route, projection) => {
	if (!projection) projection = { name: 1, grade: 1, description: 1, _id: 0 }
	try {
		const collection = await db.getCollection(routesCollection)
		const routeInfo = await collection.findOne({ name: route }, projection)
		console.log(`model/climbs.js getRouteInfo Succesfully fetched ${route}'s information`.green)
		console.log(routeInfo)
		return routeInfo
	} catch (error) {
		console.log(`model/climbs.js getRouteInfo Error fetching ${route} info from the database`.red.bgGray)
		console.log(`${error}`.red)
	}


	return { route, climber }
}


module.exports = {
	getAllCrags,
	getAllRoutes,
	getRouteInfo,
	createCrags,
	createRoutes,
	getRouteId
}
