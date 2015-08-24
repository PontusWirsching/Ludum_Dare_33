function Level(game, name) {
    this.game = game;
    this.name = name;
    
    this.laneOffset = 16;

    /* This is an array of y positions, for example: index 0 is the y pos of the top lane. */
    this.lanes = [96, 160, 224, 288, 352, 416, 480];

    this.aiSpawningXPos = 128;

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

            if (entity.type.type == "monster")
                if (entity.x < 100) {
                    entity.ChangeToState(GameTypes.EntityState.Attacking);
                    this.entities.splice(i, 1);
                }

            

        }
    }
    
    this.build();   
}