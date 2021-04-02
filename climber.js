const fileManager = require('./fileManager')
const saveFilePath = './save/profiles.json'
let saveFileData = null

const messages = {
	noExistingProfiles: "There are no existing profiles. '/login/{name}/?new=true' to create a new one",
}

const load = () => {
	saveFileData = fileManager.readOrCreate(saveFilePath)
}

const jsonReaderSync = (filePath, cb) => {
	let fileData
	try {
		fileData = fs.readFileSync(filePath)
	} catch (err) {
		console.log("climber.js Error loading file".red, filePath.yellow, err)
		fs.writeFileSync(filePath, '{}')
		return
	}
	return fileData
}

const climberList = () => {
}

module.exports = {
	climberList,
	load
}