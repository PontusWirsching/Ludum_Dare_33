
/* This will be entities that are in-game. */
/* The 'type' is an object from PlayerUnits. */
function Entity(x, y, type, game) {
	
	this.width = type.width;
	this.height = type.height;
	this.x = x - this.width / 2 - type.xOffset;
	this.y = y - this.height / 2 - type.yOffset;
    this.state = GameTypes.EntityState.Walking;

	this.type = type;

	var animFPS = 16;

	if (type.Name == "MossGolem")
		animFPS = 8;
	if (type.Name == "OrcSpearThrower")
		animFPS = 24;
	if (type.Name == "ElvenArcher")
		animFPS = 24

	if (this.sprite == null) {
		this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Walk');
        this.walk = this.sprite.animations.add('walk');
        this.sprite.animations.play('walk', animFPS, true);
	}
    

    this.ChangeToState = function(state){
        this.sprite.kill();
        this.state = state;
        switch(this.state){
            case GameTypes.EntityState.Walking:
                this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Walk');
                this.walk = this.sprite.animations.add('walk');
                this.sprite.animations.play('walk', animFPS, true);
            case GameTypes.EntityState.Attacking:
                this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Attack');
                this.walk = this.sprite.animations.add('attack');
                this.sprite.animations.play('attack', animFPS, true);
        } 
        this.sprite.smoothed = false;
    }

	this.update = function() {
		if (this.type.Faction == GameTypes.Faction.Player && this.state == GameTypes.EntityState.Walking) {
			this.x -= this.type.MovementSpeed;
		}
		if (this.type.Faction == GameTypes.Faction.Enemy && this.state == GameTypes.EntityState.Walking) {
			this.x += this.type.MovementSpeed;
		}

		this.sprite.x = Math.floor(this.x);
		this.sprite.y = Math.floor(this.y);
	}




}