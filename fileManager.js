const fs = require('fs')

const create = (filePath) => {
	fs.writeFile(filePath, "[]", () => { })
	return true
}

const exists = (filePath, cb) => {
	let isExist = true
	try {
		fs.statSync(filePath)
	}
	catch (err) {
		isExist = cb
			? cb(filePath)
			: false
	}
	return isExist
}

/**
 * Read or create file. 
 * Second argument optional to prevent creating a new is it doesn't exists
 * @param {File} filePath 
 * @param {boolean} createNew default=true
 * @returns {JSON} 
 */
const read = (filePath, createNew = true) => {

	let fileData = null
	const isFileExist = createNew
		? exists(filePath, create)
		: exists(filePath)
	return isFileExist
}


module.exports = {
	read
}