const express = require('express')
const app = express()
const { climberList, climber } = require('./climber')
climberList.load()
console.log(climberList.isLoaded)
require('colors')

const messages = {
	load: {
		greet: "A climber's journey upward",
		start: "You are ready to start your adventure",
		profileErr: "Failed to load profiles"
	}
}

// Load up
app.get('/', (req, res) => {
	let mess = [messages.load.greet]
	console.log(climberList.isLoaded)
	mess.push(climberList.isLoaded
		? messages.load.start
		: messages.load.profileErr)
	res.send(mess)
})

// // JSON Parser
app.use(express.json())


// api

// login flow
//
// load and display available profiles
app.get('/login', (req, res) => {
	let profiles = climber.climberList()
	res.send(profiles)
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
app.listen(port, () => console.log(`Server listening at`, `http://localhost:${port}`.cyan))
console.log(`http://localhost:${port}\\index.html`.cyan)
