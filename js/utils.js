function objectCollision({ player, object }) {
	return (
		player.hitbox.x + player.width > object.position.x && // left of wall
		player.hitbox.x < object.position.x + object.width && // right of  wall
		player.hitbox.y + player.height > object.position.y && // bottom of wall
		player.hitbox.y < object.position.y + object.height // top off wall
	)
}
