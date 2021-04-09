const express = require('express')
const router = express.Router()
const validate = require('./validate')
const messages = require('../model/messages')
const { climbers, climberList } = require('../model/climbers')

//
// greeting screen
router.get('/', (req, res) => {
	let mess = messages.getMessage(["greet"])
	res.send(mess)
})

//
// display available climbers
router.get('/login', (req, res) => {
	let mess = {}
	if (climberList.all.length) {
		mess = messages.getMessage(["foundClimbers"])
		climberList.all.forEach(el => mess = Object.assign(mess, messages.listClimber(climbers.getShort(el))))
	}
	else mess = messages.getMessage(["noCurrentClimbers"])

	mess = Object.assign(mess, messages.getMessage(["create"]))
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
	const id = climbers.new(req.body.name)
	let mess = {
		messages: messages.getMessage(['success', 'introduce'], { climber: id }),
		climbers: climbers.getDetails(id)
	}
	res.send(mess)
})

//
// login into an existing account
router.get('/login/:id', (req, res) => {
	const error = validate.validateId(req.params, climberList.all)
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