function Level(game, name) {
    this.game = game;
    this.name = name;
    
    /* This is an array of y positions, for example: index 0 is the y pos of the top lane. */
    this.lanes = [96, 160, 224, 288, 352, 416, 480];

    /* Sets the name. */
    this.setName = function(name) {
        this.name = name;
    }

    /* Builds the level with the right background image and settings. */
    this.build = function() {
        console.log(this.name);
        this.background = this.game.add.sprite(0, 0, this.name);
    }
    
    
    this.build();

    
}

