// User Authentication
const auth = firebase.auth()

const whenSignedIn = document.querySelector('#whenSignedIn')
const whenSignedOut = document.querySelector('#whenSignedOut')

const signInBtn = document.querySelector('#signInBtn')
const signOutBtn = document.querySelector('#signOutBtn')

const userDetails = document.querySelector('#userDetails')

const provider = new firebase.auth.GoogleAuthProvider()

// Sign in event handlers
signInBtn.onclick = () => auth.signInWithPopup(provider)

signOutBtn.onclick = () => {
	auth.signOut()
	window.location.reload() // reload the page on sign out
}

auth.onAuthStateChanged((user) => {
	if (user) {
		// signed in
		whenSignedIn.hidden = false
		whenSignedOut.hidden = true
		userDetails.innerHTML = `${user.displayName}`
		// userDetails.innerHTML = `${user.displayName} - ${user.uid}`
	} else {
		// not signed in
		whenSignedIn.hidden = true
		whenSignedOut.hidden = false
		userDetails.innerHTML = ``
	}
})

// Firestore
const db = firebase.firestore()

let tasksRef // reference to a database location
let unsubscribe //turn off realtime stream

auth.onAuthStateChanged((user) => {
	if (user) {
		// Database Reference
		tasksRef = db.collection('tasks')

		// Assign new task to Firestore
		doneBtn.onclick = () => {
			if (!taskNameInput.value) {
				alert("No task name! Let's find something to do together ^^")
				return
			}

			const pokemonIndex = Math.floor(Math.random() * pokemonList.length) //random foe pokemon

			tasksRef.add({
				uid: user.uid,
				taskName: taskNameInput.value,
				numOfInterval: possibleNoIntervals[currentNoIntervalsIndex],
				studyTime: possibleInterval[currentIntervalIndex],
				restTime: possibleRest[currentRestIndex],
				isDone: false,
				pokemon: pokemonList[pokemonIndex],
			})

			assignPanel.classList.add('hidden')
			optionsPanel.classList.remove('hidden')

			// Reset to default
			taskNameInput.value = ''
			currentNoIntervalsIndex = 3
			currentIntervalIndex = 2
			currentRestIndex = 0

			displayNoIntervals.textContent = possibleNoIntervals[currentNoIntervalsIndex]
			displayInterval.textContent = possibleInterval[currentIntervalIndex]
			displayRest.textContent = possibleRest[currentRestIndex]
		}

		// Load undone tasks
		doOption.onclick = () => {
			optionsPanel.classList.add('hidden')

			unsubscribe = tasksRef
				.where('uid', '==', user.uid)
				.where('isDone', '==', false)
				.onSnapshot((querySnapshot) => {
					querySnapshot.docs.forEach((doc) => {
						const taskBtn = document.createElement('button')
						taskBtn.innerHTML = `
							<h2 class="task-name">${doc.data().taskName}</h2>
							<span class="task-info">Interval:${doc.data().numOfInterval}*${doc.data().studyTime}min - Rest:${
							doc.data().restTime
						}min</span>
						`

						taskListPanel.append(taskBtn)
						taskBtn.onclick = () => {
							battle.initiated = true
							numOfInterval = doc.data().numOfInterval
							studyTime = doc.data().studyTime
							restTime = doc.data().restTime
							currentFoePokemon = doc.data().pokemon
							currentTaskId = doc.id

							updateClock(studyTime)

							menu.classList.add('hidden')
						}
					})

					const cancelBtn = document.createElement('button')
					cancelBtn.innerHTML = `<h2 class="task-name prev">Cancel</h2>`
					taskListPanel.append(cancelBtn)
					cancelBtn.onclick = () => {
						taskListPanel.innerHTML = ''
						taskListPanel.classList.add('hidden')
						optionsPanel.classList.remove('hidden')
					}

					taskListPanel.classList.remove('hidden')
				})
		}

		// Load achievement board (done tasks)
		window.addEventListener('keydown', (e) => {
			if (e.key === ' ' && isOnAchievementZone) {
				if (!openAchievement) {
					openAchievement = true

					achievementBoard.innerHTML = '<h1>Achievement</h1>'

					unsubscribe = tasksRef
						.where('uid', '==', user.uid)
						.where('isDone', '==', true)
						.onSnapshot((querySnapshot) => {
							querySnapshot.docs.forEach((doc) => {
								const doneTask = document.createElement('div')
								doneTask.innerHTML = `
									<img src="../assets/${doc.data().pokemon}-collection.png" />
									<div>
										<h2 class="task-name">${doc.data().taskName}</h2>
										<span class="task-info">Duration: ${doc.data().numOfInterval * doc.data().studyTime} mins</span>
									</div>
								`

								achievementBoard.append(doneTask)
							})
							achievementBoard.classList.remove('hidden')
						})
				} else {
					openAchievement = false
					achievementBoard.classList.add('hidden')
				}
			}
		})
	} else {
		// Unsubscribe when the user signs out
		unsubscribe && unsubscribe()
	}
})
