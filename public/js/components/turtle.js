let graphActive = false
function colorSelector() {
	const rand = random()
	switch (true) {
		case rand < 0.3:
			return [random(10, 50), random(0, 70)]
			break
		case rand > 0.7:
			return [
				[random(10, 20), random(20, 30), random(7, 17)],
				[random(25, 35), random(30, 40), random(20, 33)]
			]
			break
		default:
			return [
				[random(35, 40), random(20, 23), random(10, 13)],
				[random(55, 60), random(30, 33), random(20, 23)]
			]

	}
}

class Rock {
	constructor() {
		this.x = random(0, width)
		this.y = random(0, 4 * height)
		this.xLength = random(1, 100)
		this.yLenght = random(-0.5, 0.5) * this.xLength
		this.distort = random(100, 200);
		[this.fillRGB, this.strokeRGB] = colorSelector()
	}
	draw() {
		fill(this.fillRGB)
		stroke(this.strokeRGB)
		curve(this.x - this.distort, this.y - this.distort, this.x, this.y, this.x + this.xLength, this.y + this.yLenght, this.x - this.distort, this.y + this.distort)
	}
	update() {
		this.y += 2 - floor(this.y / 1200) * 1200
		this.draw()
	}
}

class Climber {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.body = new Body(x, y)
		this.head = new Head(x, y, - 80)
		this.leftArm = new Limb(x, y, - 30, - 40, - 75, - 100, - 100, - 70)
		this.rightArm = new Limb(x, y, + 30, - 40, 75, 90, 100, - 70)
		this.leftLeg = new Limb(x, y, - 30, 50, - 75, - 40, - 50, 100)
		this.rightLeg = new Limb(x, y, 30, 50, 75, 40, 50, 100)
		this.tail = new Limb(x, y, 0, 50, 75, 10, 10, 50)
		this.count = 10
		this.speed = 1
		this.xoff = 0.01
		this.yoff = 1
	}
	update() {
		stroke(200, 130, 0)
		fill(255, 0, 15)
		let xPerlin = noise(this.xoff) * 600
		let yPerlin = noise(this.yoff) * 200 + 200
		this.body.update(this.speed, xPerlin, yPerlin)
		this.head.update(this.speed, xPerlin, yPerlin)
		this.leftArm.update(this.speed, xPerlin, yPerlin)
		this.rightArm.update(-this.speed, xPerlin, yPerlin)
		this.leftLeg.update(-this.speed, xPerlin, yPerlin)
		this.rightLeg.update(this.speed, xPerlin, yPerlin)
		this.tail.update(-0.4 * this.speed, xPerlin, yPerlin)
		this.count++
		this.xoff += .005
		this.yoff += .002
		if (this.count == 20) {
			this.count = 0
			this.speed *= -1
		}
	}
}

class Body {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.left = 20.0
		this.right = 20.0
	}
	draw() {
		rectMode(CENTER)
		rect(this.x, this.y, 50, 100, this.left, this.right, this.left / 2, this.right / 2)
	}
	update(speed, xPerlin, yPerlin) {
		this.x = xPerlin
		this.y = yPerlin
		this.left -= speed
		this.right += speed
		this.draw()
	}
}

class Head {
	constructor(x, y, yt) {
		this.x = x
		this.y = y
		this.yt = yt
		this.start = 3 * Math.PI / 4
		this.end = Math.PI / 4
		this.speed = 0.027
	}
	draw() {
		arc(this.x, this.y + this.yt, 60, 80, this.start, this.end)
	}
	update(speed, xPerlin, yPerlin) {
		this.x = xPerlin
		this.y = yPerlin
		this.start += this.speed * speed
		this.end += this.speed * speed
		this.draw()
	}
}

class Limb {
	constructor(x, y, xt1, yt1, xm1, xm2, xt2, yt2) {
		this.x = x
		this.y = y
		this.xt1 = xt1
		this.yt1 = yt1
		this.xm1 = xm1
		this.xm2 = xm2
		this.xt2 = xt2
		this.yt2 = yt2
		this.speed = 5
	}
	draw() {
		bezier(this.x + this.xt1, this.y + this.yt1, this.x + this.xm1, this.y + this.yt2 + 20, this.x + this.xm2, this.y + this.yt2, this.x + this.xt2, this.y + this.yt2)
	}
	update(speed, xPerlin, yPerlin) {
		this.y = yPerlin
		this.x = xPerlin
		this.yt2 += this.speed * speed
		this.draw()
	}
}

const rocks = []
const climber = new Climber(300, 300)

function setup() {
	let myCanvas = createCanvas(600, 600)
	myCanvas.parent('p5-window')
	loadRocks()
	frameRate(60)
}

function draw() {
	if (!graphActive) return
	background(0, 80)

	stroke(200)
	strokeWeight(2)
	noFill()
	rocks.forEach(rock => {
		rock.update()
	})
	climber.update()
}

function loadRocks() {
	for (let i = 0; i < 200; i++) {
		rocks.push(new Rock())
	}
}
const clicked = () => {
	graphActive = true
	setTime = new Promise(() => {
		setTimeout(() => {
			graphActive = false
		}, 1000)
	})

}
clicked()

const clickListener = document.addEventListener('click', clicked)