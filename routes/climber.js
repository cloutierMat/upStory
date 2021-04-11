const express = require('express')
const router = express.Router()
const validate = require('./validate')
const messages = require('../model/messages')
const climbers = require('../model/climbers')

//
// greeting screen
router.get('/', async (req, res) => {
	let mess = await messages.getMessage(["greet"])
	res.send(mess)
})

//
// display available climbers
router.get('/login', async (req, res) => {
	let mess = await messages.getMessage(["login", "create"])
	res.send(mess)
})

//
// create a new login
router.post('/login', async (req, res) => {
	const error = validate.validateName(req.body)
	if (error) {
		res.status(400).send(error)
		return
	}
	console.time()
	const climber = await climbers.createClimber(req.body.name)
	let mess = { messages: await messages.getMessage(['introduce']), climber }
	console.timeEnd()
	res.send(mess)
})

//
// login into an existing account
router.get('/login/:name', async (req, res) => {
	const error = validate.validateName(req.params)
	if (error) {
		res.status(400).send(error)
		return
	}
	const name = req.params.name
	const climber = await climbers.getDetails(name)
	console.log(climber)
	let mess = await messages.getMessage(['introduce'])
	console.log("in Climbers ", mess)
	mess.climber = climber
	res.send(mess)
})

module.exports = router