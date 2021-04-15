import format from './formatOutput.js'
import climb from './climb.js'


const getUserPrompt = () => prompt("Enter Your climber's name")

const createTextBox = (key, dataObj) => {
	console.log(`loading text at ${key} page`)

	const div = format.createBox()

	const strDiv = format.createTextDiv(dataObj.description)
	div.appendChild(strDiv)
	const links = Object.getOwnPropertyNames(dataObj.link)
	for (const link of links) {
		const button = format.createButton(link, loginButtonsClick)
		div.appendChild(button)
	}

	return div
}

const createClimberBox = (climberObj) =>
	createTextBox(climberObj.name, {
		description: format.climberToString(climberObj),
		link: {}
	})


const createPageElements = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')

	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}

	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		let text = ""
		if (key === 'climber')
			text = createClimberBox(dataObj)
		else
			text = createTextBox(key, dataObj)
		textDiv.appendChild(text)
	}
}

const createVanButton = () => {
	let vanLogo = document.getElementById('vanLogo')
	vanLogo.src = '../images/van.jpg'
	vanLogo.id = 'vanLogo'
	vanLogo.addEventListener('click', loginButtonsClick)
}

const loadSuccessfulLogin = (dataObj) => {
	createPageElements(dataObj)
	createVanButton()
	climb.setClimber(dataObj.climber.name)
}

const startButtonClick = () => {
	fetch('/api/climber/login')
		.then((response) => response.json())
		.then((pageData) => {
			createPageElements(pageData)
		})
}

const loginButtonsClick = (event) => {
	event = event.target.id
	console.log(`${event} button clicked`)
	let answer = ""
	switch (event) {
		case "login":
			answer = getUserPrompt()
			login(answer)
			break
		case "create":
			answer = getUserPrompt()
			postNewClimber(answer)
			break
		case "van":
		case "vanLogo":
			climb.vanClick()
			break
		default:
			break
	}
}


export default {
	startButtonClick
}


const postNewClimber = (name) => {

	let postOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	}

	fetch('api/climber/login', postOptions)
		.then((response) => {
			if (response.status === 400) {
				alert("That Name is already taken!!!")
				return
			}
			login(name)
		})
}

const login = (name) => {
	fetch(`/api/climber/login/${name}`)
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
			loadSuccessfulLogin(dataObj)
		})
}