const prettify = (str) => str.split('\n').join('<br>').split("_").join(" ")

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

const killDivChild = (divToClean) => {
	while (divToClean.firstChild) {
		divToClean.removeChild(divToClean.lastChild)
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
 * .title: string
 * 
 * .text: string
 * 
 * .link: {label: string, eventCaller:callback} (optional)
*/
const updateTextDivContent = (contentArray) => {
	const textDiv = document.getElementById("textDiv")
	killDivChild(textDiv)
	contentArray.forEach(content => textDiv.appendChild(createTextBox(content)))
}

export default {
	prettify,
	updateTextDivContent,
}