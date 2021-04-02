const fileManager = require('./fileManager')
const saveFilePath = './save/profiles.json'
let saveFileData = null

let climbers = []

const messages = {
	noExistingProfiles: "There are no existing profiles. '/login/{name}/?new=true' to create a new one",
}

const loadSaves = () => {
	saveFileData = fileManager.read(saveFilePath)
	return climbers = saveFileData
		? JSON.parse(saveFileData)
		: false
}

const climberList = {
	isLoaded: false,
	load: () => { if (loadSaves()) this.isLoaded = true },
}

const climber = {

}

module.exports = {
	climberList,
	climber
}