const acephale = {
	id: "1",
	name: "Acephale",
	climbs: {
		bundaDeFora: {
			id: "1",
			name: "Bunda De Fora",
			grade: 14
		},
		firstFlight: {
			id: "2",
			name: "First Flight",
			grade: 14
		},
		illyDown: {
			id: "3",
			name: "Illy Down",
			grade: 12
		}
	}
}

const cougar = {
	id: "2",
	name: "Cougar Creek",
	climbs: {
		blackSlabbath: {
			id: "1",
			name: "Black Slabbath",
			grade: 11
		},
		pokerface: {
			id: "2",
			name: "Poker Face",
			grade: 10
		},
		aceOfSpades: {
			id: "3",
			name: "Ace Of Spades",
			grade: 9
		}
	}
}

const crags = [
	acephale,
	cougar
]

module.exports = {
	crags
}