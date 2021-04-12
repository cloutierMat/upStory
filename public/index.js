const loadText = (dataObj) => {
	console.log("loading text at greeting page")

	const div = document.createElement('div')

	const strDiv = document.createElement('div')
	strDiv.textContent = dataObj.description

	const strButton = document.createElement('button')
	strButton.textContent = 'Login'

	const buttonAnchor = document.createElement('a')
	buttonAnchor.setAttribute('href', 'climber/login.html')
	buttonAnchor.appendChild(strButton)

	div.appendChild(strDiv)
	div.appendChild(buttonAnchor)
	return div
}

const loadGreetingPage = (pageDataArray) => {
	const textDiv = document.getElementById('textDiv')

	for (pageData in pageDataArray) {
		dataObj = pageDataArray[pageData]
		console.log(dataObj)
		const text = loadText(dataObj)
		textDiv.appendChild(text)
	}
}

fetch('api/climber')
	.then((response) => response.json())
	.then((pageData) => {
		loadGreetingPage(pageData)
	})