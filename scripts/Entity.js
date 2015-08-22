
/* This will be entities that are in-game. */
/* The 'type' is an object from PlayerUnits. */
function Entity(x, y, type) {
	
	this.width = type.width;
	this.height = type.height;
	this.x = x - this.width / 2;
	this.y = y - this.height / 2;

	this.type = type;

	this.sprite = game.add.sprite(this.x, this.y, type.Name, "Walk_000.png");


	this.update = function() {
		this.sprite.x = Math.floor(this.x);
		this.sprite.y = Math.floor(this.y);
	}


}