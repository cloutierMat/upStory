// decide if I print as object or as text...
const outputAsText = false

// let's record the last sent message. it might come in handy...
let lastMessage

const messages = {
	// Messages on first screen
	greet: {
		text: "A climber's journey upward"
	},
	start: {
		text: "You are ready to start your adventure",
		link: "login"
	},

	// login 
	choose: {
		text: "To load from your previous save files",
		link: "login/?name={name}"
	},
	create: {
		text: "To create a new profile",
		link: "login/new/?name={newName}"
	},
	// 400 messages
	profileErr: {
		text: "Failed to load profiles",
	},
	failed: (func, el) => `From "${func}": Failed to load "${el}" `
}

// functions to process the text to output
const join = (obj) => {
	let mess = ""
	for (prop in obj)
		mess += typeof obj[prop] == 'string'
			? obj[prop] + "\r"
			: join(obj[prop])
	return mess
}

// transform links
const address = (port, str) => `http://localhost:${port}/${str}`

// create a new message
const create = (arr) => {
	let mess = arr.map((el, i) => typeof el == 'string' ? messages[el] : el)
	outputAsText && (mess = join(mess))
	lastMessage = mess
	return mess
}

// initialization method
const init = (num) => {
	for (prop in messages) {
		if (Object.keys(messages[prop]).find(el => el == 'link'))
			messages[prop].link = address(num, messages[prop].link)
	}
}

const message = {
	init: init,
	create: create
}


module.exports = {
	message,
}
