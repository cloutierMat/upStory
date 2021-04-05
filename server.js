const express = require('express')
const app = express()
const { climberList, climber } = require('./public/climber')
require('colors')
const { message } = require("./public/messages")

//initiate processes
const port = process.env.PORT || 3000
message.init(port)
climberList.init()

// // JSON Parser
app.use(express.json())

//
//
// api

// Greeting page
app.get('/', (req, res) => {
	const mess = ["greet"]
	mess.push(climberList.isLoaded ? "start" : "profileErr")
	res.send(message.create(mess))
})

// login flow
//
// load and display available profiles
app.get('/login', (req, res) => {


	const mess = climberList.displayShort()
	mess.length && mess.push('choose')
	mess.push("create")
	res.send(message.create(mess))
})

// receives a username
// creates a new profile if ?new=true
// otherwise load from file if existing
// returns the full profile
app.put('/login/:user', (req, res) => {
	let profile = req.query.new == 'true'
		? "creating a new profile"
		: "fetching your data"
	res.send(profile)
})



app.use('/', express.static('public'))

// PORT
app.listen(port, () => console.log(`Server listening at`, `http://localhost:${port}`.cyan))
