const fileManager = require('./fileManager')
const saveFilePath = './save/profiles.json'

const loadSaves = () => {
	let saveFileData = fileManager.read(saveFilePath, true)
	return saveFileData
		? saveFileData
		: false
}

const climberList = {
	isLoaded: false,
	list: null,
	load: () => {
		climberList.list = loadSaves()
		if (climberList.list) {
			climberList.isLoaded = true
		}
	},
	display: () => climberList.list.map(el => `${el.name} can climb 5.${el.grade}`)
}

const climber = {
}

module.exports = {
	climberList,
	climber
}