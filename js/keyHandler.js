let lastKey = 'ArrowUp'

window.addEventListener('keydown', (e) => {
	switch (e.key) {
		case 'ArrowUp':
			keys.ArrowUp.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowUp'
			if (openAchievement) true
			break

		case 'ArrowLeft':
			keys.ArrowLeft.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowLeft'
			break

		case 'ArrowDown':
			keys.ArrowDown.pressed = true
			if (!keys[lastKey].pressed && !futureStep.x && !futureStep.y) lastKey = 'ArrowDown'
			if (openAchievement) true
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
					taskListPanel.innerHTML = '' // flush task list on battle end
					optionsPanel.classList.remove('hidden')

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

			if (isOnAchievementZone) {
				if (!openAchievement) {
					openAchievement = true
					loadAchievementBoard()
					achievementBoard.classList.remove('hidden')
				} else {
					openAchievement = false
					achievementBoard.classList.add('hidden')
				}
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
