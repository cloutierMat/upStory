import login from './login.js'
import format from './formatOutput.js'

const createTextBox = (key, dataObj) => {
	console.log(`loading text at ${key} page`)

	const div = format.createBox()

	const strDiv = format.createTextDiv(dataObj.description)
	div.appendChild(strDiv)

	const links = Object.getOwnPropertyNames(dataObj.link)
	for (const link of links) {
		const button = format.createButton(link, login.startButtonClick)
		div.appendChild(button)
	}

	return div
}

//
// 
const createPageElements = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')
	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		const text = createTextBox(key, dataObj)
		textDiv.appendChild(text)
	}
}

fetch('api/climber')
	.then((response) => response.json())
	.then((pageData) => {
		createPageElements(pageData)
	})