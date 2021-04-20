import format from './formatOutput.js'
import position from './position.js'

//
// functions to create textBox on html
const createVanElement = (pageDataObject) => {
	const keys = Object.getOwnPropertyNames(pageDataObject)
	console.log("createVanElement for:", keys)

	let contentArray = []
	for (key of keys) {
		const link = (Object.getOwnPropertyNames(pageDataObject[key].link))[0]
		const content = {
			title: key,
			text: pageDataObject[key].description,
			link: {
				label: link,
				eventCaller: climbButtonsClick
			}
		}
		contentArray.push((content))
	}
	format.updateTextDivContent(contentArray)
}

const createClimbElement = (pageDataArray) => {
	console.log("createClimbElement:", pageDataArray)

	const contentArray = pageDataArray.map(obj => {
		return {
			title: obj.name,
			text: obj.description,
			link: {
				label: obj.name,
				eventCaller: cragButtonClick
			}
		}
	})
	format.updateTextDivContent(contentArray)
}

const createRouteElement = (pageDataArray) => {
	console.log("CreateRouteElement:", pageDataArray)

	const contentArray = pageDataArray.map(obj => {
		return {
			title: obj.name,
			text: `Grade: 5.${obj.grade}`,
			link: {
				label: obj.name,
				eventCaller: routeButtonClick
			}
		}
	})
	format.updateTextDivContent(contentArray)
}

const createAttemptElement = (pageDataObject) => {
	console.log("createAttemptElement:", pageDataObject.name)

	const contentArray = []

	contentArray.push({
		title: pageDataObject.name,
		text: `Grade: 5.${pageDataObject.grade}\n${pageDataObject.description}`,
		link: {
			label: "Attempt",
			eventCaller: attemptButtonClick
		}
	})

	const attempt = pageDataObject.attempts.attempt
	const success = pageDataObject.attempts.success
		? "And you were succesful!"
		: "And brilliantly failed everytime!"
	contentArray.push({
		title: position.climber().name,
		text: `You tried that route\n${attempt} time${attempt > 1 ? "s" : ""}\n${success}`
	})

	format.updateTextDivContent(contentArray)
}

const createResultElement = (pageDataObject) => {

	const returnToCrag = () => createRouteElement(position.allRoutes())
	const retryRoute = () => attemptButtonClick({ target: { id: position.route().name } })

	const contentArray = []

	console.log("createResultElement success:", pageDataObject.success)
	if (pageDataObject.success) {
		const attempt = pageDataObject.attempt
		contentArray.push({
			title: "Congrats",
			text: `You climbed it in ${attempt} ${attempt > 1 ? "tries" : "try"}!\nClick on the van to return to your van!`,
		})
	} else {
		contentArray.push({
			title: "You got crushed",
			text: `Attempt #${pageDataObject.attempt} wasn't really fruitful.\nIf you believe you still have a chance at this route! You know what to do!`,
			link: {
				label: "Try Again",
				eventCaller: retryRoute
			}
		})
	}
	const cragObj = position.crag()
	contentArray.push({
		title: "See more routes",
		text: "Browse different routes at that crag!",
		link: {
			label: cragObj.name,
			eventCaller: returnToCrag
		}
	})
	format.updateTextDivContent(contentArray)
}

//
// Event Listener
const vanClick = () => {
	fetch('/api/van')
		.then((response) => response.json())
		.then((vanObject) => {
			createVanElement(vanObject)
		})
}

const climbButtonsClick = (event) => {
	event = event.target.id
	console.log(`${event} button clicked`)
	fetch('/api/climb')
		.then((response) => response.json())
		.then((dataObj) => {
			position.allCrags(dataObj)
			createClimbElement(dataObj)
		})
}

const cragButtonClick = (event) => {
	event = event.target.id
	console.log(`${event} button clicked`)
	fetch(`/api/climb/${event}`)
		.then((response) => response.json())
		.then((dataObj) => {
			console.log("climbButtonClick position.crag:", event)
			position.crag(event)
			position.allRoutes(dataObj)
			createRouteElement(dataObj)
		})
}

const routeButtonClick = async (event) => {
	event = event.target.id
	try {
		console.log("clicked route button", event)
		const response = await fetch(`/api/climb/${position.crag().name}/${event}?climber=${position.climber().name}`)
		const routeObj = await response.json()
		console.log("routeButtonClick position.route:", event)
		position.route(routeObj)
		createAttemptElement(routeObj)
	} catch (error) {
		console.log("routeButtonClick Error")
		console.log(error)
	}
}

const attemptButtonClick = async (event) => {
	event = event.target.id
	console.log("button clicked", event)

	try {
		let postOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ climber: position.climber().name })
		}
		const crag = position.crag().name
		const route = position.route().name
		const response = await fetch(`/api/climb/${crag}/${route}/attempt`, postOptions)
		const attemptObj = await response.json()
		createResultElement(attemptObj)

	} catch (error) {
		console.log("error in attemptButtonClick")
		console.log(error)
	}
}

export default {
	vanClick,
}