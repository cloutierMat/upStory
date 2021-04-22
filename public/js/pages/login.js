import format from '../components/pageElements.js'
import climb from './climb.js'
import position from '../components/position.js'


const getUserPrompt = () => prompt("Enter Your climber's name")

//
// functions to create textBox on html
const createPageElements = (pageDataObject) => {
	const keys = Object.getOwnPropertyNames(pageDataObject)
	console.log("createPageElement for keys:", keys)
	const contentArray = []
	for (key of keys) {
		let content = {}
		if (key === "climber") {
			const climber = pageDataObject[key]
			content = {
				title: climber.name,
				text: `You can climb <strong>5.${climber.grade}</strong>\nNever forget that you are <strong>${climber.status}</strong>`
			}
		} else {
			const link = (Object.getOwnPropertyNames(pageDataObject[key].link))[0]
			content = {
				title: key,
				text: pageDataObject[key].description,
				link: {
					label: link,
					eventCaller: loginButtonsClick
				}
			}
		}
		contentArray.push(content)
	}
	format.updateTextDivContent(contentArray)
}

const createSuccesfulLogin = (dataObj) => {
	createPageElements(dataObj)
	createVanButton()
	const climber = dataObj.climber.name
	console.log("createSuccesfulLogin position.climber:", climber)
	position.climber(dataObj.climber)
}

//
// Function to create images and logos
const createVanButton = () => {
	const vanLogo = document.getElementById('vanLogoDiv')
	const vanImg = document.createElement('img')
	vanImg.src = '../images/van.jpg'
	vanImg.id = 'vanLogo'
	vanImg.addEventListener('click', loginButtonsClick)
	vanLogo.appendChild(vanImg)
}

//
// Functions to interact with server's API
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
			getLogin(name)
		})
}

const getLogin = (name) => {
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
			createSuccesfulLogin(dataObj)
		})
}

//
// Event listeners
const loginButtonsClick = (event) => {
	event = event.target.id
	console.log(`${event} button clicked`)
	let answer = ""
	switch (event) {
		case "login":
			answer = getUserPrompt()
			getLogin(answer)
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

const startButtonClick = () => {
	console.log("Start button clicked")
	fetch('/api/climber/login')
		.then((response) => response.json())
		.then((pageData) => {
			createPageElements(pageData)
		})
}

export default {
	startButtonClick
}
