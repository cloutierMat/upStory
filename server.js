const express = require('express')
const app = express()
const { climberList, climber } = require('./public/climber')
require('colors')
const fs = require('fs')
const { messages } = require("./public/messages")

//initiate climbers list
climberList.load()

// // JSON Parser
app.use(express.json())


// api
// Greeting page
app.get('/', (req, res) => {
	let mess = [messages.load.greet]
	mess.push(climberList.isLoaded
		? messages.load.start
		: messages.load.profileErr)
	res.send(messages.joinArr(mess))
})

// login flow
//
// load and display available profiles
app.get('/login', (req, res) => {
	let profiles = climberList.display()
	res.send(messages.joinArr(profiles))
})

// receives a username
// creates a new profile if ?new=true
// otherwise load from file if existing
// returns the full profile
app.get('/login/:user', (req, res) => {
	let profile = req.query.new == 'true'
		? "creating a new profile"
		: "fetching your data"
	res.send(profile)
})



app.use('/', express.static('public'))

// PORT
const port = process.env.PORT || 3000
messages.init(port)
app.listen(port, () => console.log(`Server listening at`, `http://localhost:${port}`.cyan))
