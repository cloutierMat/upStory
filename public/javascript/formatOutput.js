const prettify = (str) => str.split('\n').join('<br>').split("_").join(" ")

const climberToString = (obj) => {
	return prettify(`Your are ${obj.name}\nYou can climb up to 5.${obj.grade}\nAnd never forget that you are ${obj.status}`)
}

const createTextDiv = (str, docClass = "text") => {
	const docObj = document.createElement('div')
	docObj.innerHTML = prettify(str)
	docObj.classList.add(docClass)
	return docObj
}

const createButton = (label, link) => {
	const textObj = document.createElement('button')
	textObj.textContent = prettify(label)

	textObj.id = label
	textObj.addEventListener('click', link)

	return textObj
}

const createBox = () => {
	const div = document.createElement('div')
	div.classList.add('textBox')
	return div
}

export default {
	climberToString,
	createTextDiv,
	createButton,
	createBox,
	prettify
}