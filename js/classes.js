const tileSize = 64

class Sprite {
	constructor({
		position,
		velocity,
		image,
		frames = { max: 1 },
		scale = 1,
		isCharacter = false,
		sprites,
		moving = false,
	}) {
		this.position = position
		this.image = image
		this.frames = { ...frames, val: 0, elapsed: 0 }
		this.scale = scale
		if (isCharacter) this.hitbox = { x: 0, y: 0 }
		this.image.onload = () => {
			this.width = (this.image.width / this.frames.max) * this.scale
			this.height = (this.image.height / 2) * scale
			if (isCharacter) {
				this.hitbox.x = this.position.x
				this.hitbox.y = this.position.y + characterSize.height
			}
		}
		this.moving = moving
		this.sprites = sprites
		this.opacity = 1
	}

	draw() {
		ctx.save()
		ctx.globalAlpha = this.opacity
		ctx.drawImage(
			this.image,
			(this.frames.val * this.width) / this.scale + 1, // avoid ugly crop
			0,
			this.image.width / this.frames.max - 2, // avoid ugly crop
			this.image.height,
			this.position.x,
			this.position.y,
			(this.image.width / this.frames.max) * this.scale,
			this.image.height * this.scale
		)

		if (!this.moving) {
			this.frames.val = 0
			return
		}

		if (this.frames.max > 1) this.frames.elapsed++

		if (this.frames.elapsed % 10 === 0) {
			if (this.frames.val < this.frames.max - 1) this.frames.val++
			else this.frames.val = 0
		}
		ctx.restore()
	}

	attack(recipient) {
		const tl = gsap.timeline()
		const direction = Math.sign(recipient.position.x - this.position.x)

		tl.to(this.position, {
			x: this.position.x - 20 * direction,
		})
			.to(this.position, {
				x: this.position.x + 30 * direction,
				duration: 0.1,
				onComplete() {
					gsap.to(recipient.position, {
						x: recipient.position.x + 5 * direction,
						repeat: 3,
						yoyo: true,
						duration: 0.08,
					})

					gsap.to(recipient, {
						opacity: 0,
						repeat: 3,
						yoyo: true,
						duration: 0.08,
					})
				},
			})
			.to(this.position, {
				x: this.position.x,
			})
	}
}

class Boundary {
	static width = tileSize
	static height = tileSize

	constructor({ position }) {
		this.position = position
		this.width = tileSize
		this.height = tileSize
	}

	draw() {
		ctx.fillStyle = 'rgba(255, 0, 0, 0.0)'
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
	}
}
