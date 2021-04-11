const climbs = require('./climbs')

climbs.createRoutes('acephale', {
	name: "Bunda De Fora",
	grade: 14,
	description: "Fisrt climbed by Lev Pinter"
}
)
// {
// 	name: "First Flight",
// 		description: {
// 		grade: 14
// 	}
// }

const routes = {
	bundaDeFora: {
		crag: "acephale",
	},
	firstFlight: {
		crag: "acephale",
	},
	illyDown: {
		name: "Illy Down",
		crag: "acephale",
		grade: 12
	}
}

