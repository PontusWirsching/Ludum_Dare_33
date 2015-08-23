function Level(game, name) {
    this.game = game;
    this.name = name;
    
    this.laneOffset = 16;

    /* This is an array of y positions, for example: index 0 is the y pos of the top lane. */
    this.lanes = [96, 160, 224, 288, 352, 416, 480];

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
    }
    
    /* Updates all of the entities. */
    this.update = function() {
        for (var i = 0; i < this.entities.length; i++) {
            if (i >= this.entities.length) break;
            var entity = this.entities[i];
            if (entity == null) continue;

            entity.x -= entity.type.MovementSpeed;

            entity.update();

            if (entity.x < 100) {
                entity.sprite.kill();
                this.entities.splice(i, 1);
            }

        }
    }
    
    this.build();   
}