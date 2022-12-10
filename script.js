// Canvas variables
const canvas = document.querySelector('#main-canvas')
const ctx = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

// Handle resizeing window and help responsitivity
let ratio = Math.min(window.innerWidth / 960, window.innerHeight / 640)

canvas.style.width = canvas.width * ratio + 'px'
canvas.style.height = canvas.height * ratio + 'px'

window.addEventListener('resize', OnResizeCalled, false)

function OnResizeCalled() {
	ratio = Math.min(window.innerWidth / 960, window.innerHeight / 640)
	canvas.style.width = canvas.width * ratio + 'px'
	canvas.style.height = canvas.height * ratio + 'px'
}

// Constant for consistent reusing
const offset = {
	x: -1216,
	y: -640,
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

const backgroundHouseImage = new Image()
backgroundHouseImage.src = './assets/House.png'

const foregroundHouseImage = new Image()
foregroundHouseImage.src = './assets/ForegroundHouse.png'

const backgroundGuildImage = new Image()
backgroundGuildImage.src = './assets/Guild.png'

const foregroundGuildImage = new Image()
foregroundGuildImage.src = './assets/ForegroundGuild.png'

const backgroundGymImage = new Image()
backgroundGymImage.src = './assets/Gym.png'

const foregroundGymImage = new Image()
foregroundGymImage.src = ''

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
		house: backgroundHouseImage,
		guild: backgroundGuildImage,
		gym: backgroundGymImage,
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
		house: foregroundHouseImage,
		guild: foregroundGuildImage,
		gym: foregroundGymImage,
	},
})

const collisionsMap = []
function getCollisionsMap(map) {
	collisionsMap.splice(0, collisionsMap.length)
	for (let i = 0; i < collisions.get(map).length; i += 42) {
		collisionsMap.push(collisions.get(map).slice(i, 42 + i))
	}
}

const doorsMap = []
for (let i = 0; i < doors.get('outside').length; i += 42) {
	doorsMap.push(doors.get('outside').slice(i, 42 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleActivations.length; i += 42) {
	battleZonesMap.push(battleActivations.slice(i, 42 + i))
}

const boundaries = []
function updateBoundaries(map, offset) {
	getCollisionsMap(map)

	boundaries.splice(0, boundaries.length)
	collisionsMap.forEach((row, i) => {
		row.forEach((symbol, j) => {
			if (symbol)
				boundaries.push(
					new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } })
				)
		})
	})
}
updateBoundaries('outside', offset)

const entrances = []
doorsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol)
			entrances.push(
				new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } })
			)
	})
})

const battleActivationZones = []
battleZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol) {
			battleActivationZones.push(
				new Boundary({ position: { x: j * Boundary.width + offset.x, y: i * Boundary.height + offset.y } })
			)
		}
	})
})

let movables = [background, ...boundaries, ...entrances, ...battleActivationZones, foreground]
function updateMovables() {
	movables = [background, ...boundaries, ...entrances, ...battleActivationZones, foreground]
}

// Moving variables
let futureStep = { x: 0, y: 0 }
let moving = true

const walkingPace = 4
const runningPace = 8
let movingPace = walkingPace

// Outside or in which building variables
let isOutside = true
const buildingList = ['gym', 'house', 'guild', 'health center'] // convert door index to building name for easy usage
let currentBuilding = ''

// Battle variables
const battle = {
	initiated: false,
}

let isOnBattleZone = false
let openMenu = false

// Animation
function animate() {
	const animationId = window.requestAnimationFrame(animate)

	background.draw()
	boundaries.forEach((boundary) => {
		boundary.draw()
	})
	player.draw()
	foreground.draw()

	entrances.forEach((entrance) => {
		entrance.draw()
	})

	if (!isOnBattleZone) openMenu = false
	if (battle.initiated) {
		switchToAnimateBattle(animationId)
		return
	}

	if (openMenu) {
		player.moving = false
		return
	}

	isOnBattleZone = false
	for (let i = 0; i < battleActivationZones.length; i++) {
		const zone = battleActivationZones[i]
		// Check if player is in the battle activation area (loosen the condition a bit to prevent bug)
		if (Math.abs(player.hitbox.x - zone.position.x) <= 4 && Math.abs(player.hitbox.y - zone.position.y) <= 4) {
			isOnBattleZone = true
			console.log('Step before battle activation zone')
			break
		}
	}

	let isAtDoor = false
	for (let i = 0; i < entrances.length; i++) {
		const entrance = entrances[i]
		// Check if player is in the door activation area (loosen the condition a bit to prevent bug)
		if (Math.abs(player.hitbox.x - entrance.position.x) <= 4 && Math.abs(player.hitbox.y - entrance.position.y) <= 4) {
			isAtDoor = true
			currentBuilding = buildingList[i]
			console.log('Step before door: ' + currentBuilding)
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
			isOutside = !isOutside
			background.image = background.sprites[currentBuilding]
			foreground.image = foreground.sprites[currentBuilding]
			updateBoundaries(currentBuilding, background.position)
			updateMovables()
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
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y + movingPace } },
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
					object: { ...boundary, position: { x: boundary.position.x + movingPace, y: boundary.position.y } },
				}) // predicting next move by adding movingPace to the direction we will go
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
					object: { ...boundary, position: { x: boundary.position.x, y: boundary.position.y - movingPace } },
				})
			) {
				moving = false
				break
			}
		}

		if (isAtDoor && !isOutside) {
			isOutside = !isOutside
			background.image = background.sprites['outside']
			foreground.image = foreground.sprites['outside']
			updateBoundaries('outside', background.position)
			updateMovables()
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
					object: { ...boundary, position: { x: boundary.position.x - movingPace, y: boundary.position.y } },
				})
			) {
				moving = false
				break
			}
		}
	}
}
animate()
animate()
