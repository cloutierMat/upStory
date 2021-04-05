const express = require('express')
const app = express()
const fileManager = require('./public/fileManager')
const { climberList, climber } = require('./public/climber')
const { message } = require("./public/message")
require('colors')

const saveFilePath = './save'

//initiate processes
const port = process.env.PORT || 3000
message.init(port)


// // JSON Parser
app.use(express.json())

//
//
// api

// Greeting page
app.get('/', (req, res) => {
	const mess = ["greet"]
	res.send(message.create(mess))
})

// login flow
//
// load and display available profiles
app.get('/login', (req, res) => {
	(async () => {
		try {
			const userList = await fileManager.readDirectory(saveFilePath)
			const mess = fileManager.getjson(userList)
			res.send(message.userList(mess))
		} catch (err) {
			res.status(404).send(message.create(["err404"]))
		}
	})()
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
