const canvas = document.querySelector('#main-canvas')
const c = canvas.getContext('2d')
canvas.width = 960
canvas.height = 640

const offset = {
	x: -1216,
	y: -642,
}

const walkingPace = 4
let movingPace = walkingPace

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

const characterSize = {
	width: 32,
	height: 64,
}

const backgroundImage = new Image()
backgroundImage.src = './assets/Map.png'

const playerImage = new Image()
playerImage.src = './assets/boy-debug.png'

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 42) {
	collisionsMap.push(collisions.slice(i, 42 + i))
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
		c.fillStyle = 'rgba(255, 0, 0, 0.2)'
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
	constructor({ position, velocity, image, frames = { max: 1 }, scale = 1, isCharacter = false }) {
		this.position = position
		this.image = image
		this.frames = frames
		this.scale = scale
		if (isCharacter) this.hitbox = { x: 0, y: 0 }
		this.image.onload = () => {
			this.width = (this.image.width / this.frames.max) * this.scale
			this.height = (this.image.height / 2) * scale
			if (isCharacter) {
				this.hitbox.x = this.position.x
				this.hitbox.y = this.position.y + characterSize.height
			}
			/* console.log(this.width)
			console.log(this.height)
			console.log(this.hitbox) */
		}
	}

	draw() {
		c.drawImage(
			this.image,
			0,
			0,
			this.image.width / this.frames.max,
			this.image.height,
			this.position.x,
			this.position.y,
			(this.image.width / this.frames.max) * this.scale,
			this.image.height * this.scale
		)
	}
}

const player = new Sprite({
	position: {
		x: canvas.width / 2 - characterSize.width,
		y: canvas.height / 2 - characterSize.height,
	},
	image: playerImage,
	frames: {
		max: 4,
	},
	scale: 2,
	isCharacter: true,
})

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: backgroundImage,
})
const testBoundary = new Boundary({ position: { x: 320, y: 320 } })
// const testBoundary = new Boundary({ position: { x: 448, y: 320 + 64 } })

const movables = [background, ...boundaries, testBoundary]

function objectCollision({ player, object }) {
	return (
		player.hitbox.x + player.width > object.position.x + movingPace && // left of wall
		player.hitbox.x < object.position.x + object.width - movingPace && // right of  wall
		player.hitbox.y + player.height > object.position.y + movingPace && // bottom of wall
		player.hitbox.y < object.position.y + object.height - movingPace // top off wall
	)
}

function animate() {
	window.requestAnimationFrame(animate)

	background.draw()
	boundaries.forEach((boundary) => {
		boundary.draw()
	})
	player.draw()

	let moving = true
	if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + movingPace } },
				})
			) {
				console.log('Colliding')
				moving = false
				break
			}
		}

		if (moving)
			movables.forEach((moveable) => {
				moveable.position.y += movingPace
			})
	} else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x + movingPace, y: boundary.position.y } },
				})
			) {
				console.log('Colliding')
				moving = false
				break
			}
		}

		if (moving)
			movables.forEach((moveable) => {
				moveable.position.x += movingPace
			})
	} else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - movingPace } },
				})
			) {
				console.log('Colliding')
				moving = false
				break
			}
		}

		if (moving)
			movables.forEach((moveable) => {
				moveable.position.y -= movingPace
			})
	} else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x - movingPace, y: boundary.position.y } },
				})
			) {
				console.log('Colliding')
				moving = false
				break
			}
		}

		if (moving)
			movables.forEach((moveable) => {
				moveable.position.x -= movingPace
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
