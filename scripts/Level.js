function Level(game, name) {
    this.game = game;
    this.name = name;
    
    this.laneOffset = 16;

    /* This is an array of y positions, for example: index 0 is the y pos of the top lane. */
    this.lanes = [96, 160, 224, 288, 352, 416, 480];

    this.aiSpawningXPos = -100;

    /* A list of entities currently in the level. */
    this.entities = [];

    /* Adds an entity to the array. */
    this.addEntity = function(entity) {
        this.entities.push(entity);
    }

    /* Returns an entity. */
    this.getEntity = function(index) {
        return this.entities[index];
    }

    /* Sets the name. */
    this.setName = function(name) {
        this.name = name;
    }

    this.getName = function() {
        return this.name;
    }

    /* Builds the level with the right background image and settings. */
    this.build = function() {
        this.background = this.game.add.sprite(0, 0, this.name);
        this.tree_bottoms = this.game.add.sprite(128 + 48 + 32, 64 + 64, this.name + '_tree_bottoms');
        this.tree_tops = this.game.add.sprite(128 + 48 + 32, 64 + 32 + 8 + 5, this.name + '_tree_tops');

    }


    /* Updates all of the entities. */
    this.update = function() {
        for (var i = 0; i < this.entities.length; i++) {
            if (i >= this.entities.length) break;
            var entity = this.entities[i];
            if (entity == null) continue;

            entity.update();

            //this.game.debug.spriteBounds(entity.sprite);

            entity.isAttacking = false;
            //entity.ChangeToState(GameTypes.EntityState.Walking);


            for (var j = 0; j < this.entities.length; j++) {
                if (j >= this.entities.length) break;
                var e = this.entities[j];
                if (e == null) continue;
                if (e == entity) continue;

                if (e.type.type == entity.type.type) continue;


                var attackDistance = entity.type.attackRange; //entity.hitboxWidth / 2 + e.hitboxWidth / 2 + 50;
                //console.log(entity.type.Name + ", " + e.type.Name + ", " + attackDistance + ", " + getDistance(entity, e));
                if (getDistance(entity, e) <= attackDistance && entity.lane == e.lane) {
                    entity.isAttacking = true;

                    entity.attackTimer++;
                    if (entity.attackTimer >= 60 / entity.attacksPerSecond) {
                        console.log(entity.type.Name + " is attacking, " + entity.damage + ", opponent health: " + e.health);

                        e.health -= entity.damage;

                        entity.attackTimer = 0;
                    }
                }
            }

            if (entity.isAttacking && entity.toggle) {
                entity.toggle = false;
                console.log(entity.type.Name + " started attacking!");
                entity.ChangeToState(GameTypes.EntityState.Attacking);
            } else if (!entity.isAttacking && !entity.toggle) {
                entity.toggle = true;
                console.log(entity.type.Name + " stopped attacking!");
                entity.ChangeToState(GameTypes.EntityState.Walking);
            }

            
            if (entity.type.type == "monster")
                if (entity.x < -100) {
                    entity.sprite.kill();
                    this.entities.splice(i, 1);
                    this.game.global.playerScore++;
                }

            if (entity.type.type == "ai_monster")
                if ((entity.x - entity.width / 2) > this.game.world.width) {
                    entity.sprite.kill();
                    this.entities.splice(i, 1);
                    this.game.global.aiScore++;
                }

            if (entity.health <= 0) {
                entity.ChangeToState(GameTypes.EntityState.Death);
                this.entities.splice(i, 1);
                if (entity.type.type == "ai_monster") {
                    this.game.global.monsterPoints += entity.type.Cost;
                }
            }
            

            

        }
    }
    
    this.build();   
}

function getDistance(entity1, entity2) {
    var x1 = entity1.x + entity1.type.width / 2;
    var y1 = entity1.y + entity1.type.height / 2;

    var x2 = entity2.x + entity2.type.width / 2;
    var y2 = entity2.y + entity2.type.height / 2;

    return Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
}