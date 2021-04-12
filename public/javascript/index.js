import login from './login.js'
import format from './formatOutput.js'

const loadText = (key, dataObj) => {
	console.log(`loading text at ${key} page`)

	const strDiv = format.createTextDiv(dataObj.description)
	const button = format.createButton(key, login.greetingsButtonClick)

	const div = format.createBox()
	div.appendChild(strDiv)
	div.appendChild(button)
	return div
}

const loadGreetingPage = (pageDataObject) => {
	const textDiv = document.getElementById('textDiv')
	const keyArray = Object.keys(pageDataObject)
	for (key of keyArray) {
		const dataObj = pageDataObject[key]
		const text = loadText(key, dataObj)
		textDiv.appendChild(text)
	}
}

fetch('api/climber')
	.then((response) => response.json())
	.then((pageData) => {
		loadGreetingPage(pageData)
	})