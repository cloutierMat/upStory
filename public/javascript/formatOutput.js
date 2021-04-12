const prettify = (str) => str.split('\n').join('<br>').split("_").join(" ")

const createTextDiv = (str, docClass = "text") => {
	const docObj = document.createElement('div')
	docObj.innerHTML = prettify(str)
	docObj.classList.add(docClass)
	return docObj
}

const createButton = (label, link) => {
	const textObj = document.createElement('button')
	textObj.textContent = prettify(label)

	const anchor = document.createElement('a')
	anchor.id = label
	anchor.appendChild(textObj)
	anchor.addEventListener('click', link)

	return anchor
}

const createBox = () => {
	const div = document.createElement('div')
	div.classList.add('textBox')
	return div
}

export default {
	createTextDiv,
	createButton,
	createBox
}