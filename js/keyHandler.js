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
		case ' ':
			if (battle.initiated) {
				isPaused = !isPaused

				if (numOfInterval === 0) {
					battle.initiated = false
					timer.classList.add('hidden')
					gsap.to('#transition-div', {
						opacity: 1,
						duration: 0.4,
						onComplete() {
							animate()
							gsap.to('#transition-div', {
								opacity: 0,
								duration: 0.4,
							})
						},
					})
				}
			}

			if (isOnBattleZone && !battle.initiated) {
				openMenu = true
				menu.classList.remove('hidden')
			}
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
