const db = require('../model/db')
const messages = require('../model/messages')

async function loadUp() {
	await messages.createMessage("greet",
		"Welcome to UpStory.\n==>Careful, falling hazard!!\nTo begin and progres your story, follow along",
		{
			"start": "get /api/climber/login"
		}
	)
	await messages.createMessage("login",
		"If you believe you already exists, don't hesitate to try your luck and enter your username!",
		{
			"login": "get api/climber/login/:{yourName}"
		}
	)
	await messages.createMessage("create",
		"To create a new climber, follow this link\nJust remember the whole AlphaNumeric thingyStuff!!",
		{
			"create": "post api/climber/login  {name:{Your_Name}}"
		}
	)
	await messages.createMessage("introduce",
		"Let me introduce you to yourself\n\t\t\t\"When you are done admiring your own self protrait, follow the rest to get to your climber\"s van\"\n\t\t\t\"==> Remember where it is. You can always come back to it when you need a rest\"",
		{
			"van": "get api/van {climber:{id}}"
		}
	)
	await messages.createMessage("van",
		"Here is your van all the options start from here\n\t\"There is a shop that doesn't exist so you can't go\"\n\t\"Or you can take your van to go explore all the crags\"",
		{
			"crags": "get /api/climber/login"
		}
	)
	await messages.createMessage("errors",
		"You screwed up big time!"
	)
	await messages.createMessage("invalidName",
		"Maybe you,\nMaybe me,\nBut I can't find your climber name!",
		{
			"invalidName": null
		}
	)
	db.close()
}


loadUp()