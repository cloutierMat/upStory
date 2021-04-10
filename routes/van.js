const express = require('express')
const router = express.Router()
const validate = require('./validate')
const messages = require('../model/messages')

// Van hub
router.get('/', (req, res) => {
	let mess = messages.getMessage(["van"])
	res.send(mess)
})

module.exports = router