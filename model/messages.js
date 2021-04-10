const db = require('./db')
require('colors')

const messCollection = "messages"

const createMessage = async (name, description, options) => {
	if (!options) options = []
	try {
		const collection = await db.getCollection(messCollection)
		const result = await collection.insertOne({
			name,
			description,
			options,
		})
		console.log("model/messages.js createMessage Succesfully added new message to database".green)
		console.log(result.ops)
	} catch (error) {
		console.log("model/messages.js createMessage Error adding new message to database".red.bgCyan)
		console.log(`${error}`.red)
	}
}

const getMessage = async (messArr) => {
	messages = {}
	try {
		for (message of messArr) {
			const collection = await db.getCollection(messCollection)
			const result = await collection.findOne({ name: message })
			messages[result.name] = {
				description: result.description,
				options: result.options
			}
			console.log(`model/messages.js getMessage Succesfully loaded '${message}' from database`.green)
			console.log(result)
		}
		return messages
	} catch (error) {
		console.log("model/messages.js getMessage Error loading a message from database".red.bgCyan)
		console.log(`${error}`.red)
	}
}

module.exports = {
	createMessage,
	getMessage
}