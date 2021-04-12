let graph = {
	backColor: 0,
	pointSize: 15,
	stroke: [222, 33, 6],
	fill: [0, 0, 222],
	active: false
}
class Wave {
	constructor(amp, period, phase) {
		this.amplitude = amp
		this.period = period
		this.phase = phase
	}
	y(x) {
		return sin(this.phase + x * TWO_PI / this.period) * this.amplitude
	}
	update() {
		this.phase += 0.1 - TWO_PI * (floor(this.phase / TWO_PI))
	}
	color(y) {
		let r = map(y, 0, height, 0, 255)
		let g = map(y, height / 2, height, 200, 0)
		let b = map(y, height / 2, 0, 0, 255)
		return [r, g, b]
	}
}
let waves = []

function setup() {
	myCanvas = createCanvas(600, 600)
	myCanvas.parent('p5-window')
	waveSetup()
	noFill()
	noStroke()
	fill(graph.fill)
	stroke(graph.stroke)
	strokeWeight(2)
	frameRate(30)
}

function draw() {
	background(graph.backColor)
	if (!graph.active) return
	beginShape()
	for (let x = 0; x < width; x += graph.pointSize) {
		let y = 0
		waves.forEach(wave => {
			let temp = map(wave.y(x / width), -1, 1, 0, height)
			y += temp
			fill(wave.color(temp))
			// circle(x,temp,graph.pointSize);      
		})
		circle(x, y / waves.length, graph.pointSize)
		// vertex(x, y / waves.length);
	}
	endShape()
	for (let wave of waves) {
		wave.update()
	}
}

function waveSetup() {
	for (let i = 0; i < 5; i++) {
		waves[i] = new Wave(random(0.1, 1.5), random(0.2, 1), floor(random(0, width)))
	}
}

const clicked = () => {
	graph.active = true
	setTime = new Promise(() => {
		setTimeout(() => {
			graph.active = false
			waveSetup()
		}, 1000)
	})

}


const clickListener = document.addEventListener('click', clicked)