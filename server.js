const express = require('express')
const app = express()
const Joi = require('joi')
const climbs = require('./public/climbs')
const message = require('./public/message')
const { climber, climberList } = require('./public/climber')
require('colors')

//initiate processes
const port = process.env.PORT || 3000


// // JSON Parser
app.use(express.json())

// Joi schema
const schema = Joi.object({
	username:
})
//
//
// api

// Greeting page
app.get('/api', (req, res) => {
	const mess = ["greet"]
	res.send(message.create(mess))
})

app.get('/api/login', (req, res) => {
	const mess = climberList.all.length
		? climberList.all.map(el => message.listClimber(climber.getShort(el)))
		: message.create(["noCurrentClimbers"])
	res.send(mess)
})

app.post('/api/login/:name', (req, res) => {
	const id = climber.new(req.params.name)
	const mess = { ...message.create(['success', 'introduce']), ...climber.getDetails(id) }
	res.send(mess)
})

app.post('/api/login/:id', (req, res) => {

})

app.use('/', express.static('public'))

// PORT
app.listen(port, () => {
	console.log(`Server listening at`, `http://localhost:${port}`.cyan)
	message.init(port)
})
