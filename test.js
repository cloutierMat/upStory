const attempts = require('./model/attempts')
const climbs = require('./model/climbs')

const getAll = async (route, climber) => {
	const result = await climbs.getRouteInfo(route)
	result.attempts = await attempts.getOneByClimber(route, climber)
	console.log(result)
}


getAll('Bunda_De_Fora', 'Ali')