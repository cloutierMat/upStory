const express = require('express')
const router = express.Router()

const climb = require('../model/climbs/climbs')
require('../model/climbs/crags') // Initialize crags
require('../model/climbs/routes') // Initialize routes

router.get('/', (req, res) => {
	let mess = climb.getList()
	res.send(mess)
})

router.get('/:crag', (req, res) => {
	const crag = req.params.crag
	let mess = climb.getCrag(crag)
	res.send(mess)
})

router.get('/:crag/:route', (req, res) => {
	const crag = req.params.crag
	const route = req.params.route
	let mess = climb.getRoute(crag, route)
	res.send(mess)
})

router.put('/:area/:route', (req, res) => {

	res.send({ area: req.params.area, route: req.params.route, body: req.body })
})


module.exports = router