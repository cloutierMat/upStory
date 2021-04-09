const _climber = {}
const _list = []

class Climber {
	constructor(name) {
		this.name = name
		this.id = id
		this.grade = 8
		this.status = 'happy'
		this.ascents = []
		this.attempts = []
		climberList.all.push(id)
		return this.id
	}
}

const create = (name) => {
	const id = climberList.all.length + 1
	return _climber[id] = new Climber(name, id)
}


const getDetails = (id) => { id: _climber[id] }

const getShort = (id) => (({ name, id, grade, status }) => ({ name, id, grade, status }))(_climber[id])

const climbers = {
	create: create,
	getDetails,
	getShort

}
const climberList = {
	get: () => this.all,
	add: (id) => _list.push(id)
}
module.exports = {
	climbers,
	climberList
}

add("mat")
console.log(_climber)