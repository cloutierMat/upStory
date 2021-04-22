const db = require('./model/db')
const climbs = require('./model/climbs')

async function loadDB() {
	await climbs.createCrags("Cougar", "in hte creek")
	await climbs.createRoutes("Cougar", {
		name: "Ace_of_Spades",
		grade: "11",
		description: "Tough start, really helps to have long arms to reach the knoby thingy to the left"
	})

	db.close()
}

loadDB()