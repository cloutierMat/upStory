const db = require('../model/db')
const messages = require('../model/messages')

async function loadUp() {
	await messages.createMessage("greet2",
		"Welcome to UpStory.\n==>Careful, falling hazard!!\nTo begin and progres your story, follow along",
		[
			{
				"start": "get /api/climber/login"
			}
		]
	)
	db.close()
}


loadUp()