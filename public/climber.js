class Climber {
	constructor(name) {
		this.name = name
		this.id = climberList.all.length + 1
		this.attempts = []
		this.ascend = []
		this.grade = 8
		this.status = 'happy'
		climberList.all.push(this.id)
		return this.id
	}
}

const _climber = []

const add = (name) => {
	return _climber.push(new Climber(name))
}

const getDetails = (id) => _climber[id - 1]

const getShort = (id) => (({ name, id, grade, status }) => ({ name, id, grade, status }))(_climber[id - 1])

const climber = {
	new: add,
	getDetails,
	getShort

}
const climberList = {
	all: [],
}
module.exports = {
	climber,
	climberList
}