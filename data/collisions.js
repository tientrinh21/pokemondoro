const collisions = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017,
	4017, 4017, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 0, 0, 0, 0, 0, 4017, 0, 0, 0,
	0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 4017, 4017, 4017, 0, 0, 0, 0, 0, 0, 0,
	4017, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 4017,
	4017, 4017, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 0, 0, 0, 4017, 0, 0, 0, 4017, 0, 4017, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 0,
	4017, 4017, 4017, 4017, 4017, 0, 0, 0, 0, 0, 4017, 4017, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 4017, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 4017, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 4017, 4017, 4017, 4017, 0, 0, 0,
	4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 4017,
	4017, 4017, 4017, 4017, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 4017, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017,
	4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 4017, 4017, 4017, 0, 4017, 4017, 4017, 4017,
	0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 4017, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 0, 0, 0, 4017, 4017,
	4017, 4017, 4017, 4017, 0, 4017, 4017, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017, 4017,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]
