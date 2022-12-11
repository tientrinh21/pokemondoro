const auth = firebase.auth()

const whenSignedIn = document.querySelector('#whenSignedIn')
const whenSignedOut = document.querySelector('#whenSignedOut')

const signInBtn = document.querySelector('#signInBtn')
const signOutBtn = document.querySelector('#signOutBtn')

const userDetails = document.querySelector('#userDetails')

const provider = new firebase.auth.GoogleAuthProvider()

/// Sign in event handlers
signInBtn.onclick = () => auth.signInWithPopup(provider)

signOutBtn.onclick = () => auth.signOut()

auth.onAuthStateChanged((user) => {
	if (user) {
		// signed in
		whenSignedIn.hidden = false
		whenSignedOut.hidden = true
		// userDetails.innerHTML = `Hello ${user.displayName}! User ID: ${user.uid}`
		userDetails.innerHTML = `${user.displayName}`
	} else {
		// not signed in
		whenSignedIn.hidden = true
		whenSignedOut.hidden = false
		userDetails.innerHTML = ``
	}
})
