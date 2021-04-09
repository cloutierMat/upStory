const express = require('express')
const app = express()
require('colors')

//initiate processes
const port = process.env.PORT || 3000

//
// JSON Parser
app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

//
//
// api
const climber = require('./routes/climber')
app.use('/climber', climber)
const climb = require('./routes/climb')
app.use('/climb', climb)
const van = require('./routes/van')
app.use('/van', van)
// Greeting page
app.get('/', (req, res) => {
	res.redirect('/climber')
})

// PORT
app.listen(port, () => {
	console.log(`Server listening at`, `http://localhost:${port}`.cyan)
})
