const canvas = document.querySelector('#main-canvas')
const c = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

function OnResizeCalled() {}

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './assets/Map.png'

const playerImage = new Image()
playerImage.src = './assets/boy-down.png'

class Sprite {
	constructor({ position, velocity, image }) {
		this.position = position
		this.image = image
	}

	draw() {
		c.drawImage(this.image, this.position.x, this.position.y)
	}
}

const background = new Sprite({
	position: {
		x: -832,
		y: -288,
	},
	image: image,
})

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

function animate() {
	window.requestAnimationFrame(animate)

	background.draw()

	c.drawImage(
		playerImage,
		0,
		0,
		playerImage.width / 4,
		playerImage.height,
		canvas.width / 2 - playerImage.width / 4,
		canvas.height / 2 - playerImage.height,
		(playerImage.width / 4) * 2,
		playerImage.height * 2
	)

	if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') background.position.y += 4
	else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') background.position.x += 4
	else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') background.position.y -= 4
	else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') background.position.x -= 4
}
animate()

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

let lastKey = ''
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
