var game = new Phaser.Game(768, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });



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
    GameEntityParser.BuildPlayerEntityMenu(game);    

    setCurrentLevel("level_01");




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
    if (currentLevel != null){

        timer += 1;
        if (timer >= 60) {
            var type = PlayerUnits.Goblin;
            var lane = Math.round(Math.random() * currentLevel.lanes.length);
            var x = 800;
            var y = currentLevel.lanes[lane] + currentLevel.laneOffset;
           

           

            currentLevel.addEntity(new Entity(x, y, type));

            timer = 0;
        }

        currentLevel.update();
    }




}