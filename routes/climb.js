const express = require('express')
const router = express.Router()

require('../model/climbs/areas') // Initialize areas
require('../model/climbs/routes') // Initialize routes
const climb = require('../model/climbs/climbs')

router.get('/', (req, res) => {
	res.send('/climb')
})

router.get('/:area', (req, res) => {

	res.send(req.params.area)
})

router.get('/:area/:route', (req, res) => {

	res.send({ area: req.params.area, route: req.params.route })
})

router.put('/:area/:route', (req, res) => {

	res.send({ area: req.params.area, route: req.params.route, body: req.body })
})


module.exports = router