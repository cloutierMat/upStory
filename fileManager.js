const fs = require('fs')

const create = (filePath) => {
	fs.writeFile(filePath, "[]", () => { })

}

const exists = (filePath, cb) => {
	fs.stat(filePath, (err, status) => {
		if (err) {
			console.log("Failed to load file".red, filePath.yellow, err)
			return cb && cb(filePath)
		}
	})
}

const readOrCreate = (filePath) => {
	let fileData = null
	exists(filePath, create)

	return fileData
}

module.exports = {
	readOrCreate
}