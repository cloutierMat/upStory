const climbs = {}

const createAreas = (name, description) => {
	const text = description.text
	const routes = {}
	const approach = description.approach

	climbs[name] = {
		text,
		routes,
		approach,
	}
}

const createRoutes = (crag, description) => {
	for (routes of description) {
		climbs[crag].routes[routes.name] = routes.description
	}
}

module.exports = {
	climbs,
	createAreas,
	createRoutes
}
