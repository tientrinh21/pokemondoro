// Variables
const pokemonList = ['poliwrath', 'charmander', 'meowth', 'ivysaur', 'squirtle', 'bulbasaur']

const battleBackgroundImage = new Image()
battleBackgroundImage.src = '../assets/Battle.png'

const allyPokemonImage = new Image()
allyPokemonImage.src = '../assets/pikachu-ally.png'

const foePokemonImage = new Image()
foePokemonImage.src = '../assets/poliwrath-foe.png'

const battleBackground = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	image: battleBackgroundImage,
})

const allyPokemon = new Sprite({
	position: {
		x: 64 * 5,
		y: 64 * 5,
	},
	image: allyPokemonImage,
	frames: {
		max: 2,
	},
	scale: 2,
	isCharacter: true,
	moving: true,
})

const foePokemon = new Sprite({
	position: {
		x: 64 * 8,
		y: 64 * 5,
	},
	image: foePokemonImage,
	frames: {
		max: 2,
	},
	scale: 2,
	isCharacter: true,
	moving: true,
})

let battleAnimationId
let elapsed = 0
let isAllyTurn = true
let currentFoePokemon = ''

let studyTime = 1
let restTime = 1
let numOfInterval = 1
const studyQuote = 'Pokemon is battling, so are we!'
const restQuote = 'Drinking potion'
let isStudy = true
let isPaused = true
let totalTimeInSecond = 0
let currentTaskIndex = -1

function updateClock(time) {
	let totalTimeInSecond = time * 60

	let refreshId = setInterval(function () {
		if (numOfInterval === 0) {
			foePokemon.faint()

			clock.textContent = 'YOU WON!!'
			quote.textContent = "Let's get ourselve recover ^^"
			tasks[currentTaskIndex].isDone = true
			isStudy = true

			clearInterval(refreshId)
			return
		}

		const minute = Math.floor(totalTimeInSecond / 60).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		})
		const second = (totalTimeInSecond % 60).toLocaleString('en-US', {
			minimumIntegerDigits: 2,
			useGrouping: false,
		})

		if (totalTimeInSecond >= 0) {
			if (!isPaused) totalTimeInSecond--
			clock.textContent = minute + ':' + second
			isStudy ? (quote.textContent = studyQuote) : (quote.textContent = restQuote)
		}

		if (totalTimeInSecond === -1 && !isPaused) {
			if (isStudy) numOfInterval--
			isStudy = !isStudy
			isPaused = true
			isStudy ? updateClock(studyTime) : updateClock(restTime)
			clearInterval(refreshId)
		}
	}, 1000)
}

// Battle DOM
const menu = document.querySelector('#menu')

const timer = document.querySelector('#timer')
const clock = document.querySelector('#clock')
const quote = document.querySelector('#quote')

const optionsPanel = document.querySelector('#options')
const taskListPanel = document.querySelector('#task-list')
const assignPanel = document.querySelector('#assign-task')

const doOption = document.querySelector('#do')
doOption.addEventListener('click', () => {
	optionsPanel.classList.add('hidden')

	for (let i = 0; i < tasks.length; i++) {
		// Don't display done task
		if (tasks[i].isDone) continue

		const taskBtn = document.createElement('button')
		taskBtn.innerHTML = `
			<h2 class="task-name">${tasks[i].taskName}</h2>
			<span class="task-info">Interval:${tasks[i].numOfInterval}*${tasks[i].studyTime}min \t - \t Rest:${tasks[i].restTime}min</span>
		`

		taskListPanel.append(taskBtn)
		taskBtn.addEventListener('click', () => {
			battle.initiated = true
			numOfInterval = tasks[i].numOfInterval
			studyTime = tasks[i].studyTime
			restTime = tasks[i].restTime
			currentFoePokemon = tasks[i].pokemon
			currentTaskIndex = i

			updateClock(studyTime)

			menu.classList.add('hidden')
		})
	}

	const cancelBtn = document.createElement('button')
	cancelBtn.innerHTML = `<h2 class="task-name prev">Cancel</h2>`
	taskListPanel.append(cancelBtn)
	cancelBtn.addEventListener('click', () => {
		taskListPanel.innerHTML = ''
		taskListPanel.classList.add('hidden')
		optionsPanel.classList.remove('hidden')
	})

	taskListPanel.classList.remove('hidden')
})

const possibleNoIntervals = [1, 2, 3, 4, 5, 6, 7, 8]
const possibleInterval = [1, 2, 5, 10, 15, 25, 45, 60]
const possibleRest = [1, 2, 5, 10, 15, 20, 25, 30]
let currentNoIntervalsIndex = 3
let currentIntervalIndex = 2
let currentRestIndex = 0

const decreaseNoIntervals = document.querySelector('#decrease-num-intervals')
const increaseNoIntervals = document.querySelector('#increase-num-intervals')
const displayNoIntervals = document.querySelector('#num-intervals')

const decreaseInterval = document.querySelector('#decrease-interval')
const increaseInterval = document.querySelector('#increase-interval')
const displayInterval = document.querySelector('#interval')

const decreaseRest = document.querySelector('#decrease-rest')
const increaseRest = document.querySelector('#increase-rest')
const displayRest = document.querySelector('#rest')

const taskNameInput = document.querySelector('#task-name-input')
const doneBtn = document.querySelector('#done')
const prevBtn = document.querySelector('#prev')

decreaseNoIntervals.addEventListener('click', () => {
	currentNoIntervalsIndex - 1 >= 0
		? (currentNoIntervalsIndex = currentNoIntervalsIndex - 1)
		: (currentNoIntervalsIndex = 7)
	displayNoIntervals.textContent = possibleNoIntervals[currentNoIntervalsIndex]
})
increaseNoIntervals.addEventListener('click', () => {
	displayNoIntervals.textContent = possibleNoIntervals[++currentNoIntervalsIndex % 8]
})

decreaseInterval.addEventListener('click', () => {
	currentIntervalIndex - 1 >= 0 ? (currentIntervalIndex = currentIntervalIndex - 1) : (currentIntervalIndex = 7)
	displayInterval.textContent = possibleInterval[currentIntervalIndex % 8]
})
increaseInterval.addEventListener('click', () => {
	displayInterval.textContent = possibleInterval[++currentIntervalIndex % 8]
})

decreaseRest.addEventListener('click', () => {
	currentRestIndex - 1 >= 0 ? (currentRestIndex = currentRestIndex - 1) : (currentRestIndex = 7)
	displayRest.textContent = possibleRest[currentRestIndex]
})
increaseRest.addEventListener('click', () => {
	displayRest.textContent = possibleRest[++currentRestIndex % 8]
})

doneBtn.addEventListener('click', () => {
	if (!taskNameInput.value) {
		alert("No task name! Let's find something to do together ^^")
		return
	}

	const pokemonIndex = Math.floor(Math.random() * pokemonList.length) //random foe pokemon

	tasks.push({
		taskName: taskNameInput.value,
		numOfInterval: possibleNoIntervals[currentNoIntervalsIndex],
		studyTime: possibleInterval[currentIntervalIndex],
		restTime: possibleRest[currentRestIndex],
		isDone: false,
		pokemon: pokemonList[pokemonIndex],
	})
	// console.log(tasks)

	assignPanel.classList.add('hidden')
	optionsPanel.classList.remove('hidden')
})

prevBtn.addEventListener('click', () => {
	// Reset to default
	taskNameInput.value = ''
	currentNoIntervalsIndex = 3
	currentIntervalIndex = 2
	currentRestIndex = 0

	displayNoIntervals.textContent = possibleNoIntervals[currentNoIntervalsIndex]
	displayInterval.textContent = possibleInterval[currentIntervalIndex]
	displayRest.textContent = possibleRest[currentRestIndex]

	assignPanel.classList.add('hidden')
	optionsPanel.classList.remove('hidden')
})

const assignOption = document.querySelector('#assign')
assignOption.addEventListener('click', () => {
	optionsPanel.classList.add('hidden')
	assignPanel.classList.remove('hidden')
	taskNameInput.focus()
})

const cancelOption = document.querySelector('#cancel')
cancel.addEventListener('click', () => {
	menu.classList.add('hidden')
	openMenu = false
})

// Animation functions
function switchToAnimateBattle(animationId) {
	// deactivate current animation loop
	window.cancelAnimationFrame(animationId)

	gsap.to('#transition-div', {
		opacity: 1,
		duration: 0.4,
		onComplete() {
			animateBattle()
			timer.classList.remove('hidden')
			gsap.to('#transition-div', {
				opacity: 0,
				duration: 0.4,
			})
		},
	})
}

function animateBattle() {
	battleAnimationId = window.requestAnimationFrame(animateBattle)
	battleBackground.draw()
	allyPokemon.draw()

	foePokemonImage.src = `../assets/${currentFoePokemon}-foe.png`
	foePokemon.draw()

	elapsed++
	if (elapsed % 100 === 0 && !isPaused && isStudy) {
		isAllyTurn ? allyPokemon.attack(foePokemon) : foePokemon.attack(allyPokemon)
		isAllyTurn = !isAllyTurn
	}
}
