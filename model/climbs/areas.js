const climbs = require('./climbs')

climbs.createAreas("acephale",
	{
		text: `One of Bow Valley's hardest crag.
		"Recommended for intermediate to expert"`,
		approach: `Driving east bound on HWY 10. a few km past the 'Heart Creek' parking lot, you will find dirty cars parked in the ditch
	"From there find the climber's trail to the wall."
	"Approach time: approx 45min"`,
	})
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