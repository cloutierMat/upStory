const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send("A Climber's journey upward")
})

// JSON Parser
app.use(express.json())




app.use('/', express.static('public'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening at ${port}`))