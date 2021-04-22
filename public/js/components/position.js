let _climber = ""
let _crag = ""
let _route = ""
let _allCrags = []
let _allRoutes = []

//
// Define access
const climber = (name = _climber) => {
	_climber = name
	return _climber
}

const allCrags = (cragsArr = _allCrags) => {
	_allCrags = cragsArr
	return _allCrags
}

const crag = (name) => {
	if (name)
		_crag = _allCrags.find(el => el.name === name)
	return _crag
}

const allRoutes = (routesArr = _allRoutes) => {
	_allRoutes = routesArr
	return _allRoutes
}

const route = (name = _route) => {
	_route = name
	return _route
}

export default {
	climber,
	crag,
	allCrags,
	allRoutes,
	route
}