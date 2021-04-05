const fileManager = require('./fileManager')
const saveFilePath = './save/profiles.json'
// const saveFilePath = './save/.holder'

const loadSaves = () => {
	let saveFileData = fileManager.read(saveFilePath, true)
	return saveFileData
		? saveFileData
		: []
}

const init = () => {
	climberList.list = loadSaves()
	if (climberList.list) {
		climberList.isLoaded = true
	}
}

const displayShort = () => climberList.list.map(el => { return { name: el.name, grade: `5.${el.grade}` } })

const climberList = {
	isLoaded: false,
	list: [],
	init: init,
	displayShort: displayShort
}

const climber = {
}

module.exports = {
	climberList,
	climber
}