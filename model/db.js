const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
const databaseName = 'upStory'

let connectMongoClient = MongoClient.connect(dbUrl, { useUnifiedTopology: true })

let getDb = connectMongoClient.then((client) => {
	return client.db(databaseName)
})

function getCollection(name) {
	return getDb.then((db) => { return db.collection(name) })
}

function close() {
	return connectMongoClient.then((client) => {
		return client.close()
	})
}

const findOneByName = (collection, name) => {
	return collection.findOne({ name: name })
}

const insertOne = (collection, obj) => {
	return collection.insertOne(obj)
}

module.exports = {
	getDb,
	getCollection,
	close,
	findOneByName,
	insertOne
}