function postMessage() {
	let message = { name: "rat" }

	let postOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(message)
	}

	fetch('a/', postOptions)
		.then((response) => { console.log(response) })
		.then(() => console.log('here'))
}


addEventListener("keypress", postMessage)
