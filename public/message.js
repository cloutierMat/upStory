// decide if I print as object or as text...

let PORT = 0

const messages = {
	greet: {
		text: ["Welcome to UpStory.", "==>Careful, falling hazard!!", "To begin and progres your story, follow the links"],
		link: ["get", "login"]
	},

	noCurrentClimbers: {
		text: ["No current climbers exists for that account", "You should think about creating one", "No, really, you can't keep going without it!"],
		link: ["post", "login/{Your Name}"]
	},


}

const listClimber = (climber) => {
	climber.link = createLink(["get", `login/${climber.id}`])
	return climber
}

const createLink = ([req, link]) => `${req} http://localhost:${PORT}/api/${link}`

const init = (port) => {
	PORT = port
	for (message in messages) {
		const obj = messages[message]
		if (obj.hasOwnProperty('link')) obj.link = createLink(obj.link)
	}
}

const create = (arr) => {
	if (arr.length === 0) return arr
	return arr.map(el => { if (messages[el]) return messages[el] }).filter(el => el)
}


module.exports = {
	init,
	create,
	listClimber
}
