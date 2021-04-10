const express = require('express')
const router = express.Router()
const validate = require('./validate')
const messages = require('../model/messages')
const { climbers, climberList } = require('../model/climbers')

const assign = (obj1, obj2) => Object.assign(obj1, obj2)

//
// greeting screen
router.get('/', async (req, res) => {
	let mess = await messages.getMessage(["greet"])
	res.send(mess)
})

//
// display available climbers
router.get('/login', async (req, res) => {
	let mess = await messages.getMessage(["create"])
	const list = climberList.get()
	if (list.length) {
		mess = assign(mess, await messages.getMessage(["foundClimbers"]))
		// list.forEach(el => mess = assign(mess, messages.listClimber(climbers.getShort(el))))
	}
	else mess = await messages.getMessage(["noCurrentClimbers"])

	res.send(mess)
})

//
// create a new login
router.post('/login', (req, res) => {
	const error = validate.validateName(req.body)
	if (error) {
		res.status(400).send(error)
		return
	}
	const id = climbers.create(req.body.name)
	let mess = { messages: messages.getMessage(['success', 'introduce']) }
	mess = assign(mess, messages.listClimber(climbers.getShort(id)))

	res.send(mess)
})

//
// login into an existing account
router.get('/login/:name', (req, res) => {
	const error = validate.validateId(req.params, climberList.get())
	if (error) {
		res.status(400).send(error)
		return
	}
	const id = req.params.id
	let mess = messages.getMessage(['success', 'introduce'])
	mess.climber = climbers.getDetails(id)
	res.send(mess)
})

module.exports = router