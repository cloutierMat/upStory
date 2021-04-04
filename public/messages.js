let port = 0
const messages = {
	load: {
		greet: "A climber's journey upward",
		start: "You are ready to start your adventure\nGo To:\t/login",
		profileErr: "Failed to load profiles"
	},
	init: (num) => port = num,
	joinArr: (arg) => {
		return arg.join("\n") + "\n"
	}
}


module.exports = {
	messages,
}
