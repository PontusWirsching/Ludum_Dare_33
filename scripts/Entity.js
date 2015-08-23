
/* This will be entities that are in-game. */
/* The 'type' is an object from PlayerUnits. */
function Entity(x, y, type, game, lane) {
	
	this.width = type.width;
	this.height = type.height;
	this.x = x - this.width / 2 - type.xOffset;
	this.y = y - this.height / 2 - type.yOffset;

	this.type = type;

	var animFPS = 16;

	if (type.Name == "MossGolem")
		animFPS = 8;
	if (type.Name == "OrcSpearThrower")
		animFPS = 24;

	if (this.sprite == null) {
		this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Walk');
		this.walk = this.sprite.animations.add('walk');
		this.sprite.animations.play('walk', animFPS, true);
	}



	


	this.update = function() {
		this.sprite.x = Math.floor(this.x);
		this.sprite.y = Math.floor(this.y);
	}




}