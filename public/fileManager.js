const fs = require('fs')

const get = (filePath) => {
	let data = null
	try {
		data = fs.readFileSync(filePath, 'utf8', '[]')
	} catch (err) {
		return data
	}
	return JSON.parse(data)
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
 * Second argument optional to prevent creating a new is it doesn't exists
 * @param {File} filePath 
 * @param {boolean} createNew default=false
 * @returns {JSON} 
 */
const read = (filePath, createNew = false) => {
	const isFileExist = createNew
		? exists(filePath, create)
		: exists(filePath)
	if (isFileExist) {
		return get(filePath)
	}
	return isFileExist

}


module.exports = {
	read
}