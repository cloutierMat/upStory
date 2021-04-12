const express = require('express')
const router = express.Router()
const validate = require('./validate')

const messages = require('../model/messages')
const climbs = require('../model/climbs')


//
// Van hub
router.get('/', async (req, res) => {
	let mess = await messages.getMessage(["van"])
	res.send(mess)
})

//
// display list of crags
router.get('/crags', (req, res) => {
	res.redirect('/climb')
})

router.get('/climb', async (req, res) => {
	res.send("we")
})

module.exports = router