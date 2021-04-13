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

const loadClimber = (key, dataObj) => {

}

const loadLoginPage = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')
	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}
	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		let text = ""
		if (key === 'climber')
			text = loadClimber(key, dataObj)
		else
			text = loadText(key, dataObj)
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
	switch (event) {
		case "login":
			fetch(`/api/climber/login/${answer}`)
				.then((response) => response.json())
				.then((dataObj) => {
					if (dataObj.hasOwnProperty('error')) {
						alert(dataObj.error)
						return
					}
					if (dataObj.hasOwnProperty('invalidName')) {
						alert(dataObj.invalidName.description)
						return
					}
					loadLoginPage(dataObj)
				})
			break
		case "create":
			break
		case "introduce":
			break
		default:
			break
	}
}

const getUserPrompt = () => prompt("Enter Your climber's name")

export default {
	greetingsButtonClick
}