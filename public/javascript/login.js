import format from './formatOutput.js'

const loadText = (key, dataObj) => {
	console.log(`loading text at ${key} page`)
	console.log(key)
	const strDiv = format.createTextDiv(dataObj.description)
	const button = format.createButton(key, loginButtonsClick)
	const div = format.createBox()

	div.appendChild(strDiv)
	div.appendChild(button)
	return div
}


const loadLoginPage = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')
	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}
	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		const text = loadText(key, dataObj)
		textDiv.appendChild(text)
	}
}

const greetingsButtonClick = () => {
	fetch('/api/climber/login')
		.then((response) => response.json())
		.then((pageData) => {
			loadLoginPage(pageData)
		})
}

const loginButtonsClick = (event) => {
	event = event.target.textContent
	console.log(`${event} button clicked`)
	let answer = getUserPrompt()
	if (event === 'login') {
		fetch(`/api/climber/login/${answer}`)
			.then((response) => response.json())
			.then((dataObj) => console.log(dataObj))
		//
		// Need to deal with dataObj and introduce the climber to itself
		//
		return
	}
	//
	// Need to create path for the createClimber
	//
}

const getUserPrompt = () => prompt("Enter Your climber's name")

export default {
	greetingsButtonClick
}