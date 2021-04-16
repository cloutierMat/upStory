import format from './formatOutput.js'

const currentClimber = {}

const createTextBox = (key, dataObj) => {
	console.log(`loading text for ${key} box`)

	const div = format.createBox()

	const strDiv = format.createTextDiv(dataObj.description)
	div.appendChild(strDiv)
	const links = Object.getOwnPropertyNames(dataObj.link)
	for (const link of links) {
		const button = format.createButton(link, climbButtonsClick)
		div.appendChild(button)
	}

	return div
}

function loadTextDiv(pageDataObject, textDiv) {
	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		let text = ""
		text = createTextBox(key, dataObj)
		textDiv.appendChild(text)

	}
}

const createClimbElement = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')

	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}

	if (Array.isArray(pageDataObject)) {
		pageDataObject.forEach(obj => {
			console.log({ [obj.name]: obj })
			loadTextDiv({ [obj.name]: obj }, textDiv)
		})
	} else
		loadTextDiv(pageDataObject, textDiv)
}

const createRouteElement = (dataObj) => {
	const textDiv = document.getElementById('textDiv')

	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}

	for (const route of dataObj) {
		const text = `${route.name}\nGrade: ${route.grade}`
		const routeDiv = format.createTextDiv(text, 'textBox')
		const button = format.createButton(route.name)
		button.addEventListener('click', routeButtonClick)
		routeDiv.appendChild(button)
		textDiv.appendChild(routeDiv)
	}
}

const vanClick = () => {
	fetch('/api/van')
		.then((response) => response.json())
		.then((vanObject) => {
			createClimbElement(vanObject)
		})
}

const setClimber = (climber) => {
	currentClimber.climber = climber
}

const climbButtonsClick = (event) => {
	event = event.target.id
	console.log(`${event} button clicked`)
	switch (event) {
		case "crags":
			fetch('/api/climb')
				.then((response) => response.json())
				.then((dataObj) => {
					createClimbElement(dataObj)
				})
			break

		default:
			fetch(`/api/climb/${event}`)
				.then(response => response.json())
				.then(dataObj => createRouteElement(dataObj))
			break
	}
}

const routeButtonClick = (event) => {
	console.log(event.target)
}

export default {
	vanClick,
	setClimber
}