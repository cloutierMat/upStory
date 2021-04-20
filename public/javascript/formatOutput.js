const prettify = (str) => str.split('\n').join('<br>').split("_").join(" ")

const createTextDiv = (str, docClass = "text") => {
	const docObj = document.createElement('div')
	docObj.innerHTML = prettify(str)
	docObj.classList.add(docClass)
	return docObj
}

const createButton = (label, eventCaller) => {
	const textObj = document.createElement('button')
	textObj.textContent = prettify(label)

	textObj.id = label
	textObj.addEventListener('click', eventCaller)

	return textObj
}

const createBox = () => {
	const div = document.createElement('div')
	div.classList.add('textBox')
	return div
}

const killTextDivChild = () => {
	const textDiv = document.getElementById("textDiv")
	while (textDiv.firstChild) {
		textDiv.removeChild(textDiv.lastChild)
	}
}


const createTextBox = (content) => {
	const div = createBox()
	let text = `<strong>${content.title}</strong>\n`
	text += content.text
	div.innerHTML = prettify(text) + "<br>"
	if (content.link) {
		const button = createButton(content.link.label, content.link.eventCaller)
		div.appendChild(button)
	}
	return div
}

/**
 * Delete content from current textDiv and load new textBoxes
 * @param {Array} contentArray Array of objects with content to create textBox
 *
 * content.title: string
 * 
 * content.text: string
 * 
 * content.link: {label: string, eventCaller:callback} (optional)
*/
const updateTextDivContent = (contentArray) => {
	killTextDivChild()
	const textDiv = document.getElementById("textDiv")
	contentArray.forEach(content => textDiv.appendChild(createTextBox(content)))
}

export default {
	prettify,
	updateTextDivContent,
	createTextDiv,
	createBox,
	createButton,
}