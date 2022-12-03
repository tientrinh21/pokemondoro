const canvas = document.querySelector('#main-canvas')
const c = canvas.getContext('2d')
canvas.width = 960
canvas.height = 640

const offset = {
	x: -832,
	y: -288,
}

const keys = {
	ArrowUp: {
		pressed: false,
	},
	ArrowLeft: {
		pressed: false,
	},
	ArrowDown: {
		pressed: false,
	},
	ArrowRight: {
		pressed: false,
	},
}

const image = new Image()
image.src = './assets/Map.png'

const playerImage = new Image()
playerImage.src = './assets/boy-down.png'

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 30) {
	collisionsMap.push(collisions.slice(i, 30 + i))
}

class Boundary {
	static width = 64
	static height = 64

	constructor({ position }) {
		this.position = position
		this.width = 64
		this.height = 64
	}

	draw() {
		c.fillStyle = 'red'
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}

const boundaries = []
collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol)
			boundaries.push(
				new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } })
			)
	})
})

class Sprite {
	constructor({ position, velocity, image, frames = { max: 1 }, scale = 1 }) {
		this.position = position
		this.image = image
		this.frames = frames
		this.scale = scale
	}

	draw() {
		c.drawImage(this.image, this.position.x, this.position.y)

		c.drawImage(
			this.image,
			0,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y(this.image.width / 4) * 2,
			this.image.height * this.scale
		)
	}
}
/* canvas.width / 2 - this.image.width / 4,
			canvas.height / 2 - this.image.height, */

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: image,
})

const testBoundary = new Boundary({ position: { x: 400, y: 400 } })

const movables = [background, testBoundary]

function animate() {
	window.requestAnimationFrame(animate)

	background.draw()
	testBoundary.draw()
	/* boundaries.forEach((boundary) => {
		boundary.draw()
	}) */

	if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
		movables.forEach((moveable) => {
			moveable.position.y += 4
		})
	} else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
		movables.forEach((moveable) => {
			moveable.position.x += 4
		})
	} else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
		movables.forEach((moveable) => {
			moveable.position.y -= 4
		})
	} else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
		movables.forEach((moveable) => {
			moveable.position.x -= 4
		})
	}
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
			keys.ArrowUp.pressed = true
			lastKey = 'ArrowUp'
			break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true
			lastKey = 'ArrowLeft'
			break
		case 'ArrowDown':
			keys.ArrowDown.pressed = true
			lastKey = 'ArrowDown'
			break
		case 'ArrowRight':
			keys.ArrowRight.pressed = true
			lastKey = 'ArrowRight'
			break
	}
})

window.addEventListener('keyup', (e) => {
	switch (e.key) {
		case 'ArrowUp':
			keys.ArrowUp.pressed = false
			break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false
			break
		case 'ArrowDown':
			keys.ArrowDown.pressed = false
			break
		case 'ArrowRight':
			keys.ArrowRight.pressed = false
			break
	}
})
