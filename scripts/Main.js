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

    game.load.spritesheet('KoboldRunner_Walk', 'assets/KoboldRunner_Walk.png', 81, 81);
    game.load.spritesheet('KoboldSap_Walk', 'assets/KoboldSap_Walk.png', 81, 81);
    game.load.spritesheet('Goblin_Walk', 'assets/Goblin_Walk.png', 81, 81);
    game.load.spritesheet('OrcSpearThrower_Walk', 'assets/OrcSpearThrower_Walk.png', 81, 81);
    game.load.spritesheet('MossGolem_Walk', 'assets/MossGolem_Walk.png', 201, 201);
    game.load.spritesheet('RockQuarry_Walk', 'assets/RockQuarry_Walk.png', 201, 201);

    Resources.Load(game);
}

function create() {
    
    
    addLevel(new Level(game, "level_01"));
    
    
    //BuildLevel();

    entityParser = new GameEntityParser();
    entityParser.BuildPlayerEntityMenu(game);

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
    entityParser.GetCurrentlySelectedUnit();
    
    if (currentLevel != null){

        timer += 1;
        if (timer >= 60) {


            var type = PlayerUnits.Goblin;
            var lane = Math.round(Math.random() * (currentLevel.lanes.length - 1));
            var x = 800;
            var y = currentLevel.lanes[lane - 1] + currentLevel.laneOffset;
           
            var r = Math.round(Math.random() * 5);

            switch(r) {
                case 0:
                    type = PlayerUnits.Goblin;
                    break;
                case 1:
                    type = PlayerUnits.MossGolem;
                    break;
                case 2:
                    type = PlayerUnits.RockQuarry;
                    break;
                case 3:
                    type = PlayerUnits.OrcSpearThrower;
                    break;
                case 4:
                    type = PlayerUnits.KoboldSap;
                    break;
                case 5:
                    type = PlayerUnits.KoboldRunner;
                    break;
            }
           

            currentLevel.addEntity(new Entity(x, y, type));

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