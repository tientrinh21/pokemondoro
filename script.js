// Variables
const canvas = document.querySelector('#main-canvas')
const ctx = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

let ratio = Math.min(window.innerWidth / 960, window.innerHeight / 640)

canvas.style.width = canvas.width * ratio + 'px'
canvas.style.height = canvas.height * ratio + 'px'

window.addEventListener('resize', OnResizeCalled, false)

function OnResizeCalled() {
	ratio = Math.min(window.innerWidth / 960, window.innerHeight / 640)
	canvas.style.width = canvas.width * ratio + 'px'
	canvas.style.height = canvas.height * ratio + 'px'
}

const offset = {
	x: -1216,
	y: -642,
}

const walkingPace = 4
const runningPace = 8
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

const backgroundOutsideImage = new Image()
backgroundOutsideImage.src = './assets/Map.png'

const foregroundOutsideImage = new Image()
foregroundOutsideImage.src = './assets/Foreground.png'

const backgroundHealthCenterImage = new Image()
backgroundHealthCenterImage.src = './assets/HealthCenter.png'

const foregroundHealthCenterImage = new Image()
foregroundHealthCenterImage.src = './assets/ForegroundHealthCenter.png'

const playerUpImage = new Image()
playerUpImage.src = './assets/boy-up.png'

const playerLeftImage = new Image()
playerLeftImage.src = './assets/boy-left.png'

const playerDownImage = new Image()
playerDownImage.src = './assets/boy-down.png'

const playerRightImage = new Image()
playerRightImage.src = './assets/boy-right.png'

// Objects
const player = new Sprite({
	position: {
		x: canvas.width / 2 - characterSize.width,
		y: canvas.height / 2 - characterSize.height,
	},
	image: playerDownImage,
	frames: {
		max: 4,
	},
	scale: 2,
	isCharacter: true,
	sprites: {
		up: playerUpImage,
		left: playerLeftImage,
		down: playerDownImage,
		right: playerRightImage,
	},
})

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: backgroundOutsideImage,
	sprites: {
		outside: backgroundOutsideImage,
		'health center': backgroundHealthCenterImage,
	},
})

const foreground = new Sprite({
	position: {
		x: offset.x,
		y: offset.y,
	},
	image: foregroundOutsideImage,
	sprites: {
		outside: foregroundOutsideImage,
		'health center': foregroundHealthCenterImage,
	},
})

const collisionsMap = []
function getCollisionsMap(map) {
	collisionsMap.splice(0, collisionsMap.length)
	for (let i = 0; i < collisions.get(map).length; i += 42) {
		collisionsMap.push(collisions.get(map).slice(i, 42 + i))
	}
}
getCollisionsMap('outside')
// getCollisionsMap('health center')

const doorsMap = []
for (let i = 0; i < doors.get('outside').length; i += 42) {
	doorsMap.push(doors.get('outside').slice(i, 42 + i))
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

const entrances = []
doorsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol)
			entrances.push(
				new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } })
			)
	})
})

const movables = [background, ...boundaries, ...entrances, foreground]

function objectCollision({ player, object }) {
	return (
		// add/minus addition movingPace to avoid border weird behavior
		player.hitbox.x + player.width > object.position.x + movingPace && // left of wall
		player.hitbox.x < object.position.x + object.width - movingPace && // right of  wall
		player.hitbox.y + player.height > object.position.y + movingPace && // bottom of wall
		player.hitbox.y < object.position.y + object.height - movingPace // top off wall
	)
}

let futureStep = { x: 0, y: 0 }
let moving = true

let isOutside = true

function animate() {
	window.requestAnimationFrame(animate)

	background.draw()
	boundaries.forEach((boundary) => {
		boundary.draw()
	})
	player.draw()
	foreground.draw()

	entrances.forEach((entrance) => {
		entrance.draw()
	})

	let isAtDoor = false
	for (let i = 0; i < entrances.length; i++) {
		const entrance = entrances[i]
		if (
			objectCollision({
				player: player,
				object: { ...entrance, position: { x: entrance.position.x, y: entrance.position.y } },
			}) // predicting next move, movingPace * 2 to make sure player don't move on half way
		) {
			console.log('Step before door: ' + i)
			if (!player.moving) isAtDoor = true
			break
		}
	}

	movables.forEach((moveable) => {
		if (moving) {
			moveable.position.x += Math.sign(futureStep.x) * movingPace
			moveable.position.y += Math.sign(futureStep.y) * movingPace
		}
	})

	futureStep.x -= Math.sign(futureStep.x) * movingPace
	futureStep.y -= Math.sign(futureStep.y) * movingPace
	if (!futureStep.x && !futureStep.y) {
		player.moving = false
	}

	if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
		player.moving = true
		player.image = player.sprites.up

		if (isAtDoor && isOutside) {
			console.log('Switch map')
			isOutside = !isOutside
			background.image = background.sprites['health center']
			foreground.image = foreground.sprites['health center']
			getCollisionsMap('health center')
		}

		if (!futureStep.x && !futureStep.y) {
			futureStep.y = tileSize
			moving = true
		}

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + movingPace * 2 } },
				})
			) {
				moving = false
				break
			}
		}
	} else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
		player.moving = true
		player.image = player.sprites.left

		if (!futureStep.x && !futureStep.y) {
			futureStep.x = tileSize
			moving = true
		}

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x + movingPace * 2, y: boundary.position.y } },
				}) // predicting next move, movingPace * 2 to make sure player don't move on half way
			) {
				moving = false
				break
			}
		}
	} else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
		player.moving = true
		player.image = player.sprites.down

		if (!futureStep.x && !futureStep.y) {
			futureStep.y = -tileSize
			moving = true
		}

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - movingPace * 2 } },
				})
			) {
				moving = false
				break
			}
		}

		if (isAtDoor && !isOutside) {
			console.log('Switch map')
			isOutside = !isOutside
			background.image = background.sprites['outside']
			foreground.image = foreground.sprites['outside']
			getCollisionsMap('outside')
		}
	} else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
		player.moving = true
		player.image = player.sprites.right

		if (!futureStep.x && !futureStep.y) {
			futureStep.x = -tileSize
			moving = true
		}

		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i]
			if (
				objectCollision({
					player: player,
					object: { ...boundary, position: { x: boundary.position.x - movingPace * 2, y: boundary.position.y } },
				})
			) {
				moving = false
				break
			}
		}
	}
}
animate()

let lastKey = 'ArrowUp'
window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
			keys.ArrowUp.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowUp'
			break
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowLeft'
			break
		case 'ArrowDown':
			keys.ArrowDown.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowDown'
			break
		case 'ArrowRight':
			keys.ArrowRight.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowRight'
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
