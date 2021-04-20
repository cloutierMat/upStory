const express = require('express')
const router = express.Router()

const climbs = require('../model/climbs')
const attempts = require('../model/attempts')

router.get('/', async (req, res) => {
	try {
		let mess = await climbs.getAllCrags()
		res.send(mess)
		return
	} catch (error) {
		console.log(error)
		res.send(error)
	}
})

//
// get the list of crags
router.get('/:crag', async (req, res) => {
	let mess = await climbs.getAllRoutes(req.params.crag)
	res.send(mess)
})

//
// get the route description and attempts
router.get('/:crag/:route', async (req, res) => {
	const climber = req.query.climber
	const route = req.params.route
	const mess = await climbs.getRouteInfo(route)
	mess.attempts = await attempts.getOneByClimber(route, climber)
	res.send(mess)
})

//
// get route list for the crag
router.post('/:crag/:route/attempt', async (req, res) => {
	const route = req.params.route
	const climber = req.body.climber
	let mess = await attempts.logAttempts(climber, route)
	res.send(mess)
})


module.exports = router