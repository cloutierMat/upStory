import login from './login.js'
import format from './formatOutput.js'

//
// functions to create textBox on html
const createPageElements = (pageDataObject) => {
	const link = (Object.getOwnPropertyNames(pageDataObject.greet.link))[0]
	console.log("createPageElement:", link)

	const contentArray = []
	const content = {
		title: "Welcome",
		text: pageDataObject.greet.description,
		link: {
			label: link,
			eventCaller: login.startButtonClick
		}
	}
	contentArray.push(content)
	format.updateTextDivContent(contentArray)
}

//
// Load start page
fetch('api/climber')
	.then((response) => response.json())
	.then((pageData) => {
		createPageElements(pageData)
	})