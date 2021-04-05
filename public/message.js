// decide if I print as object or as text...
const outputAsText = true
let PORT = 0

// let's record the last sent message. it might come in handy...
let lastMessage

const messages = {
	// Messages on first screen
	greet: {
		text:
			[
				"A climber's journey upward",
				"Follow me when you are ready to start your adventure"
			],
		link: ["get", "login"]
	},

	// login 
	existingUser: {
		text: "You can login with an existing user. Here's what I found:"
	},
	createLoginLink: (name) => { return { text: name, link: createlink(["get", `login/${name}`]) } },
	noExistingUser: {
		text: "I was not able to find any existing users! Sad :-("
	},

	addNewUser: {
		text: "If you want to create a new user, you can!",
		link: ["put", "login/{YourName}?new=true"]
	},




	// choose: {
	// 	text: "To load from your previous save files",
	// 	link: "login/?name={name}"
	// },
	// create: {
	// 	text: "To create a new profile",
	// 	link: "login/new/?name={newName}"
	// },


	// 400 messages
	err404: {
		text: "you suck"
	},
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

const createlink = (arr) => `===>  ${arr[0]} http://localhost:${PORT}/${arr[1]}`

// create messages from userlist
const userList = (arr) => {
	if (arr.length > 0) {
		arr.forEach(el => messages[el] = messages.createLoginLink(el))
		arr.unshift("existingUser")
	} else
		arr.push("noExistingUser")
	arr.push("addNewUser")
	return create(arr)
}

// create a new message
const create = (arr) => {
	let mess = arr.map((el, i) => typeof el == 'string' ? messages[el] : el)
	outputAsText && (mess = join(mess))
	lastMessage = mess
	return mess
}

// initialization method
const init = (port) => {
	PORT = port
	for (prop in messages) {
		if (Object.keys(messages[prop]).find(el => el == 'link'))
			messages[prop].link = createlink(messages[prop].link)
	}
}

const message = {
	init: init,
	create: create,
	userList: userList
}


module.exports = {
	message,
}
