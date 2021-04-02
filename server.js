const express = require('express')
const app = express()
const climber = require('./climber')
climber.load()
require('colors')

app.get('/', (req, res) => {
	res.send("A Climber's journey upward")
})

// // JSON Parser
// app.use(express.json())


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
