
/* This will be entities that are in-game. */
/* The 'type' is an object from PlayerUnits. */
function Entity(x, y, type, game, lane) {
	
	this.width = type.width;
	this.height = type.height;
	this.x = x - this.width / 2 - type.xOffset;
	this.y = y - this.height / 2 - type.yOffset;
    this.state = GameTypes.EntityState.Walking;

    this.damage = type.attack;
    this.health = type.hp;
    this.attackTimer = 0;
    this.attacksPerSecond = 1;
    this.isAttacking = false;
    this.lane = lane;

    if (type.Name == "ThunderDrake")
    	this.attacksPerSecond = 0.3; 

    this.toggle = true;
    this.hasAttacked = false;


    this.hitboxWidth = 0;
    this.hitboxHeight = 0;

    switch (type.Size) {
    	case GameTypes.Sizes.Small:
    		this.hitboxWidth = 32;
    		this.hitboxHeight = 32;
    		break;
    	case GameTypes.Sizes.Medium:
    		this.hitboxWidth = 32;
    		this.hitboxHeight = 64;
    		break;
    	case GameTypes.Sizes.Large:
    		this.hitboxWidth = 64;
    		this.hitboxHeight = 64;
    		break;
    }

	this.type = type;

	var animFPS = 16;

	if (type.Name == "MossGolem")
		animFPS = 8;
	if (type.Name == "OrcSpearThrower")
		animFPS = 24;
	if (type.Name == "ElvenArcher")
		animFPS = 24;
	if (type.Name == "DwarvenKnight")
		animFPS = 16.36;

	if (this.sprite == null) {
		this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Walk');
        this.walk = this.sprite.animations.add('walk');
        this.sprite.animations.play('walk', animFPS, true);
	}

	this.shittyOffset = 0;
    this.shittyOffsetTheYVersion = 0;
    

    this.ChangeToState = function(state){
        this.sprite.kill();
        this.walk.destroy();
        this.state = state;
        switch(this.state){
            case GameTypes.EntityState.Walking:

            	this.shittyOffset = 0;
                this.shittyOffsetTheYVersion = 0;

                this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Walk');
                this.walk = this.sprite.animations.add('walk');
                this.sprite.animations.play('walk', animFPS, true);
                break;
            case GameTypes.EntityState.Attacking:

            	if (this.type.Name == "ElvenArcher")
            		this.shittyOffset = -(300 - 40);
                
                if (this.type.Name == "BlazitMage"){
            		this.shittyOffset = -70;
                    this.shittyOffsetTheYVersion = -78;
                }

                this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Attack');
                this.walk = this.sprite.animations.add('attack');
                this.sprite.animations.play('attack', animFPS, true);
                break;
                
            case GameTypes.EntityState.Death:

            	if (this.type.Name == "ElvenArcher")
            		this.shittyOffset = -(300 - 40);
                
                this.shittyOffsetTheYVersion = 0;

                this.sprite = game.add.sprite(this.x, this.y, type.Name + '_Death');
                this.walk = this.sprite.animations.add('death');
                this.sprite.animations.play('death', animFPS, false);
                break;
        } 
        this.sprite.smoothed = false;
    }

    // How long should the DwarvenKnight walk, this is measured in updates. (1 sec = 60 updates)
    this.walkTime = 36 / 2;
    this.pauseTime = 36 / 2;
    this.timer = 0;

	this.update = function() {
        
        
        
		if (this.type.Faction == GameTypes.Faction.Player && this.state == GameTypes.EntityState.Walking) {
			if (!this.isAttacking) this.x -= this.type.MovementSpeed;
		}
		if (this.type.Faction == GameTypes.Faction.Enemy && this.state == GameTypes.EntityState.Walking) {
			
			if (this.type.Name == "DwarvenKnight") {
				this.timer++;

				if (this.timer >= this.walkTime) {
					if (this.timer >= this.walkTime + this.pauseTime) {
						this.timer = 0;
					}
				} else {
					if (!this.isAttacking) this.x += this.type.MovementSpeed;
				}

			} else {
				if (!this.isAttacking) this.x += this.type.MovementSpeed;
			}

		}

		this.sprite.x = Math.floor(this.x) + this.shittyOffset;
		this.sprite.y = Math.floor(this.y) + this.shittyOffsetTheYVersion;
	}




}