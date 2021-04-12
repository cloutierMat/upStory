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
app.use('/api/climber', climber)
const climb = require('./routes/climb')
app.use('/api/climb', climb)
const van = require('./routes/van')
app.use('/api/van', van)
// Greeting page
app.get('/', (req, res) => {
	res.redirect('/index.html')
})


app.use(express.static('public'))
// PORT
app.listen(port, () => {
	console.log(`Server listening at`, `http://localhost:${port}`.cyan)
})
