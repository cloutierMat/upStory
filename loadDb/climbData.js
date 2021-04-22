const db = require('../model/db')
const climbs = require('../model/climbs')

const loadUp = async () => {
	await climbs.createCrags("Acephale", "World reknown for it's steep hard pristine limestone walls. It has for held for many years the hardest route in Canada")
	await climbs.createCrags("Cougar_Creek", "Easy access, family friendly, minutes walking from Canmore. Everyone will find a route at their grades. Careful at spring time... multiple creek crossing")
	await climbs.createCrags("Echo_Canyon", "Perched up high in Grotto Mountain's South face, you will find the hard crushers and local hero testing their mettle at all time. The long and steep approach keeps most at bay. But when everything is cold in the Rockies, this will be warm under the sun! or at least you will be from walking up there!!")
	await climbs.createCrags("Heart_Creek", "A pleasant walk in a gorgeous canyon. Climbs for every level. One of the first crag to have seen sport climbing development in the Rockies! First wall is now polished and some of the moderate routes will feel scary! Retrobolting in progress: Stay away from routes that seem to have hardware from the 70's...")
	await climbs.createCrags("Sunshine_Rock", "The most accessible crag in the rockies, bar none. You can almost belay from your vehicle. Easy to moderate, with some recent work on some short and steep routes by James Blackhall to test your forearm")

	await climbs.createRoutes("Acephale", {
		name: "Bunda_De_Fora",
		grade: 14,
		description: "First climbed by Lev Pinter, it was for a long time the hardest route in Canada."
	})
	await climbs.createRoutes("Acephale", {
		name: "The_Warm-Up",
		grade: 11,
		description: "Not a great warm up but its all there is. Perma draws also which is nice. Start at the bottom of the small, left trending ramp and follow the blue streak to the anchor."
	})
	await climbs.createRoutes("Acephale", {
		name: "Beam_Me_Up_Scotty",
		grade: 13,
		description: "Start in The middle of the chossy ledge and crimp upward to the roof. Big moves and cryptic footwork end with a wild swing. A few tough moves close the deal."
	})
	await climbs.createRoutes("Acephale", {
		name: "First_Flight",
		grade: 14,
		description: "Climb through the first crux of Prime Time before traversing right and finishing up First Flight Direct Project."
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Black_Slabbath",
		grade: 11,
		description: "This route has it all, technical moves, scary balancy slab and a powerfull steep finish! Can you solve the puzzle on your first attempt?"
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Dreamcatcher in a Rusted Malibu",
		grade: 8,
		description: "Short route. Really envoyable. Don't worry the route ends before the imposible looking roof!"
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Dr_Gage’s_Meat_Injection",
		grade: 10,
		description: "Powerful for the grade! Have a buddy ready to yell 'YOU GOT THIS!!!'. You'll see, it works wonder!"
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Cosmic_String",
		grade: 10,
		description: "Just below that long corner that runs to the top, start off left. Three bolts to the corner and then fall into it. Follow it for 2 more bolts to the first station. Bring the 2nd up. Then 5 bolts to the top. That is 32 meters to the ground, so you can return down the corner or there is a station on Milk Run you could use for a double rappel as well."
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Shadow_of_Turning",
		grade: 9,
		description: "Just about the best 5.9 back here. Do It!!"
	})
	await climbs.createRoutes("Cougar_Creek", {
		name: "Crybaby",
		grade: 10,
		description: "Don't be fooled by the name, she's strong and sturdy!"
	})
	await climbs.createRoutes("Echo_Canyon", {
		name: "Buffet_Royal",
		grade: 12,
		description: "Long... long climb! Get a snack with you or something. You'll need it for this monster!"
	})
	await climbs.createRoutes("Echo_Canyon", {
		name: "Bench_With_a_View",
		grade: 11,
		description: "Look half-way up the pitch, you'll see it! Your belayer will hate you"
	})
	await climbs.createRoutes("Echo_Canyon", {
		name: "Thaczucked",
		grade: 11,
		description: "The name says it all"
	})
	await climbs.createRoutes("Heart_Creek", {
		name: "Heartline",
		grade: 7,
		description: "Lovely route! Nice gentle moves forever!"
	})
	await climbs.createRoutes("Heart_Creek", {
		name: "Sweet_Souvenir",
		grade: 11,
		description: "Mat's Nemesis"
	})
	await climbs.createRoutes("Heart_Creek", {
		name: "Survival_of_the_Fattest",
		grade: 10,
		description: "Don't pull too hard on the rock that feels loose, it is loose"
	})
	await climbs.createRoutes("Heart_Creek", {
		name: "Feel_On_Baby",
		grade: 10,
		description: "Up it goes! And a little left, and a little right. Left again... and right! Does this eventually goes up?"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Rat_Patrol",
		grade: 4,
		description: "Kiddo's love it"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Space_Dog",
		grade: 9,
		description: "Would be fun if there was an half way safe way to climb it!"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "The_Arete",
		grade: 10,
		description: "Will you believeme if I tell you it's the route on the arete?"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Hogwarts_Express",
		grade: 8,
		description: "Not a train"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Slytherin",
		grade: 10,
		description: "Don't trust it!"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Sorting_Hat",
		grade: 10,
		description: "To Separate the climber from the belayer"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "RavenClaw",
		grade: 10,
		description: "If I knew more about the Harry Potter universe, I would write a witty comment"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Griffindor",
		grade: 10,
		description: "Those are the good guys, right?"
	})
	await climbs.createRoutes("Sunshine_Rock", {
		name: "Hufflepuff",
		grade: 8,
		description: "I thought that was a pokemon!"
	})
	db.close()
}
loadUp()