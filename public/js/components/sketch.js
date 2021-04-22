let graphActive = false

class Rock {
	constructor(x, y, length, distort) {
		this.x = x
		this.y = y
		this.xLength = length
		this.yLenght = random(-0.5, 0.5) * length
		this.distort = distort
	}
	draw() {
		fill(50)
		curve(this.x - this.distort, this.y - this.distort, this.x, this.y, this.x + this.xLength, this.y + this.yLenght, this.x - this.distort, this.y + this.distort)
	}
	update() { this.y += 2 - floor(this.y / 600) * 600 }
}

class Climber {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.body = new Body(x, y)
		this.head = new Head(x, y - 80)
		this.leftArm = new Limb(x - 30, y - 40, x - 75, x - 100, x - 100, y - 70)
		this.rightArm = new Limb(x + 30, y - 40, x + 75, x + 90, x + 100, y - 70)
		this.leftLeg = new Limb(x - 30, y + 50, x - 75, x - 40, x - 50, y + 100)
		this.rightLeg = new Limb(x + 30, y + 50, x + 75, x + 40, x + 50, y + 100)
		this.count = 10
		this.speed = 1
	}
	update() {
		this.body.update(this.speed)
		this.head.update(this.speed)
		this.leftArm.update(this.speed)
		this.rightArm.update(-this.speed)
		this.leftLeg.update(-this.speed)
		this.rightLeg.update(this.speed)
		this.count++
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
		fill(255, 64, 0)
		rect(this.x, this.y, 50, 100, this.left, this.right, this.left / 2, this.right / 2)
	}
	update(speed) {
		this.left -= speed
		this.right += speed
		this.draw()
	}
}

class Head {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.start = 3 * Math.PI / 4
		this.end = Math.PI / 4
		this.speed = 0.027
	}
	draw() {
		fill(255, 22, 22)
		arc(this.x, this.y, 60, 80, this.start, this.end)
	}
	update(speed) {
		this.start += this.speed * speed
		this.end += this.speed * speed
		this.draw()
	}
}

class Limb {
	constructor(x1, y1, xm1, xm2, x2, y2) {
		this.x1 = x1
		this.y1 = y1
		this.xm1 = xm1
		this.xm2 = xm2
		this.x2 = x2
		this.y2 = y2
		this.speed = 5
	}
	draw() {
		fill(255, 22, 22)
		bezier(this.x1, this.y1, this.xm1, this.y2 + 20, this.xm2, this.y2, this.x2, this.y2)
	}
	update(speed) {
		this.y2 += this.speed * speed
		this.draw()
	}
}

const rocks = []
const climber = new Climber(300, 300)

function setup() {
	myCanvas = createCanvas(600, 600)
	myCanvas.parent('p5-window')
	loadRocks()
}

function draw() {
	background(0, 80)
	if (!graphActive) return

	stroke(200)
	strokeWeight(2)
	noFill()
	rocks.forEach(rock => {
		rock.draw()
		rock.update()
	})
	climber.update()
}

function loadRocks() {
	for (let i = 0; i < 25; i++) {
		rocks[i] = new Rock(random(0, 600), random(0, 600), random(1, 100), random(100, 200))
	}
}

const clicked = () => {
	graphActive = true
	setTime = new Promise(() => {
		setTimeout(() => {
			graphActive = false
			loadRocks()
		}, 1000)
	})

}
clicked()

const clickListener = document.addEventListener('click', clicked)