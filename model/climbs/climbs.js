const db = require('./')
const createCrags = (name, description) => {
	const text = description.text
	const approach = description.approach
	const routes = {}

	crags[name] = {
		text,
		approach,
		routes,
	}
}

const createRoutes = (crag, route) => {
	let id = Object.keys(crags[crag].routes).length + 1
	crags[crag].routes[id] = route.description
}

const getList = () => {
	const list = {}
	for (crag in crags) {
		list[crag] = {
			description: crags[crag].text,
			link: "get /van/crag/acephale"
		}
	}
	return list
}

const getCrag = (crag) => crags[crag]

const getRoute = (crag, route) => {
	return { [route]: crags[crag][route] }
}

module.exports = {
	getList,
	getCrag,
	getRoute,
	createCrags,
	createRoutes
}
