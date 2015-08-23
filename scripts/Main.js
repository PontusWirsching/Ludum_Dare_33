var game = new Phaser.Game(768, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var levels = []; // Array of levels.
var currentLevel; // The level to currently be updated.

/* Adds a level to the array. */
function addLevel(level) {
    levels.push(level);
}

/* Sets the current level by its name. */
function setCurrentLevel(name) {
    for (var i = 0; i < levels.length; i++) {
        var level = levels[i];
        if (level.getName() == name)
            currentLevel = level;
    }
}




function preload() {
    game.load.image('grassTile', 'assets/GrassTile.png');
    game.load.image('level_01', 'assets/Level1.png');

    Resources.Load(game);
}

function create() {
    
    
    addLevel(new Level(game, "level_01"));
    
    
    //BuildLevel();
    entityParser = new GameEntityParser();
    entityParser.BuildPlayerEntityMenu(game);

    setCurrentLevel("level_01");

    console.log(PlayerUnits);



}

function BuildLevel(){
        
    
    
    for(var x = GameSettings.LevelWidthStart;x < GameSettings.LevelWidth; x++){
        for(var y = GameSettings.LevelHeightStart; y < GameSettings.LevelHeight; y++){
            //this.grassTile = game.add.sprite(x * 32, y * 32, 'grassTile');
        }
    }
}

var timer = 0;

function update() {
    entityParser.GetCurrentlySelectedUnit();
    
    if (currentLevel != null){

        timer += 1;
        if (timer >= 30) {




            currentLevel.addEntity(game.add.sprite(-40 + GameSettings.TileSize * GameSettings.LevelWidth, -40 + currentLevel.lanes[Math.floor(Math.random() * currentLevel.lanes.length)] + currentLevel.laneOffset, "Goblin", "Walk_000.png"));
            timer = 0;
        }

        currentLevel.update();
    }




}

function render(){
    game.debug.text("currentPlayerSelection : " + entityParser.currentlySelected, 2, 32, "#00ff00");
    for(var i=0;i<entityParser.units.length;i++){
        game.debug.body(entityParser.units[i]);
    }
}