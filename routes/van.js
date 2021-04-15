const express = require('express')
const router = express.Router()

const messages = require('../model/messages')


//
// Van hub
router.get('/', async (req, res) => {
	let mess = await messages.getMessage(["van"])
	res.send(mess)
})

//
// display list of crags
router.get('/crags', (req, res) => {
	res.redirect('/api/climb')
})

module.exports = router