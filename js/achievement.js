// Achievement DOM
const achievementBoard = document.querySelector('#achievement')
const noAchievementsDisplay = 8

function loadAchievementBoard() {
	achievementBoard.innerHTML = '<h1>Achievement</h1>'
	for (let i = 0; i < tasks.length; i++) {
		// Don't display done task
		if (!tasks[i].isDone) continue

		const doneTask = document.createElement('div')
		doneTask.innerHTML = `
			<img src="../assets/${tasks[i].pokemon}-collection.png" />
			<div>
				<h2 class="task-name">${tasks[i].taskName}</h2>
				<span class="task-info">Duration: ${tasks[i].numOfInterval * tasks[i].studyTime} mins</span>
			</div>
		`

		achievementBoard.append(doneTask)
	}
}
