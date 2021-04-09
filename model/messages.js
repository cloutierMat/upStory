const messages = {}

// create Messages
const createMess = (name, text, link) => {
	messages[name] = {
		text: text,
		link, link
	}
}

createMess("greet",
	`Welcome to UpStory.
		"==>Careful, falling hazard!!"
		"To begin and progres your story, follow the rest"`,
	"get /climber/login")

createMess("noCurrentClimbers",
	`No current climbers exists for that account.
			"You should think about creating one"
			"No, really, you can"t keep going without it!"`)

createMess("foundClimbers",
	`Ain"t that amazing. It appears you are not the only climber on the planet
			"If you recognize yourself in one of those, by all means, login"`)

createMess("create",
	`To create a new climber, follow this rest`,
	"post /climber/login  {name:{Your_Name}}")

createMess("introduce",
	`Let me introduce you to yourself
			"When you are done admiring your own self protrait, follow the rest to get to your climber"s van"
			"==> Remember where it is. You can always come back to it when you need a rest"`,
	`get /van {climber:{id}}`)

createMess("van",
	`Here is your van all the options start from here`)

createMess("error",
	"You screwed up big time!")

const listClimber = (climber) => {
	climber.rest = `get /login/${climber.id}`
	console.log(climber)
	return
}

const getMessage = (arr) => {
	const mess = {}
	arr = [...arr]
	for (element of arr) {
		mess[element] = messages[element]
		console.log(messages[element])
	}
	return mess
}

module.exports = {
	getMessage,
	listClimber,
}
