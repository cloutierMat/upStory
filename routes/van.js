const express = require('express')
const router = express.Router()
const validate = require('./validate')

// Van hub
router.get('/', (req, res) => {

	res.send(req.body)
})

module.exports = router