const fs = require('fs')

const getData = (filePath) => {
	let data = []
	try {
		data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
	} catch (err) {
		return []
	}
	return data
}

const create = (filePath) => {
	try {
		fs.writeFileSync(filePath, '[]')
	} catch (err) {
		return false
	}
	return true
}

const exists = (filePath, cb) => {
	try {
		fs.statSync(filePath)
	}
	catch (err) {
		return isExist = cb
			? cb(filePath)
			: false
	}
	return true
}

/**
 * Read or create file. 
 * Second argument optional to enable creating a new if it doesn't exists
 * @param {File} filePath 
 * @param {boolean} createNew default=false
 * @returns {Object} false if couln't read
 */
const read = (filePath, createNew = false) => {
	const isFileExist = createNew
		? exists(filePath, create)
		: exists(filePath)
	if (isFileExist) {
		return getData(filePath)
	}
	return isFileExist

}


module.exports = {
	read
}