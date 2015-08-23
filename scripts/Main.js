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


    game.load.image('gui', 'assets/GUI/GUI.png');


    game.load.image('level_01', 'assets/Level1.png');
    game.load.image('level_01_tree_tops', 'assets/Tree_Tops.png');
    game.load.image('level_01_tree_bottoms', 'assets/Tree_Bottoms.png');

    game.load.image('level_01_rocks', 'assets/Rocks.png');

    game.load.spritesheet('KoboldRunner_Walk', 'assets/Entities/KoboldRunner_Walk.png', 81, 81);
    game.load.spritesheet('KoboldSap_Walk', 'assets/Entities/KoboldSap_Walk.png', 81, 81);
    game.load.spritesheet('Goblin_Walk', 'assets/Entities/Goblin_Walk.png', 81, 81);
    game.load.spritesheet('OrcSpearThrower_Walk', 'assets/Entities/OrcSpearThrower_Walk.png', 81, 81);
    game.load.spritesheet('MossGolem_Walk', 'assets/Entities/MossGolem_Walk.png', 201, 201);
    game.load.spritesheet('RockQuarry_Walk', 'assets/Entities/RockQuarry_Walk.png', 201, 201);


    Resources.Load(game);
}

function create() {
    
    
    addLevel(this.level_01 = new Level(game, "level_01"));


    entityParser = new GameEntityParser();
    entityParser.BuildPlayerEntityMenu(game);
    currentlySelected = 0;
    
    overlay = game.add.bitmapData(game.width, game.height);
    game.add.sprite(0, 0, overlay);


    setCurrentLevel("level_01");

    gui = game.add.sprite(0, 0, 'gui');




}

var timer = 0;

function update() {
    for(var i=0;i<entityParser.units.length;i++){
        if(game.input.activePointer.isDown){
            if(entityParser.units[i].OverlapsWith(game.input.mouse.input.x, game.input.mouse.input.y)){
                currentlySelected = entityParser.units[i].type;
                DrawRectangle(entityParser.units[i].x, entityParser.units[i].y, GameSettings.TileSize, GameSettings.TileSize);
            }
        }
    }
    
    if (currentLevel != null){

        timer += 1;
        if (timer >= 60) {


            var type = PlayerUnits.Goblin;
            var lane = Math.round(Math.random() * (currentLevel.lanes.length - 1));
            var x = game.world.width;
            var y = currentLevel.lanes[lane - 1] + currentLevel.laneOffset;
           
            var r = currentlySelected; //Math.round(Math.random() * 5);

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
           

            currentLevel.addEntity(new Entity(x, y, type, game, lane));

            game.world.bringToTop(currentLevel.tree_tops);
            game.world.bringToTop(gui);

            timer = 0;
        }

        currentLevel.update();
    }



}

function DrawRectangle(x, y, w, h){
    overlay.clear();
    overlay.ctx.beginPath();
    overlay.ctx.rect(x, y, w, h);
    overlay.ctx.strokeStyle = '#00ff00';
    overlay.ctx.stroke();
}

function render(){
    game.debug.text("currentPlayerSelection : " + entityParser.currentlySelected, 2, 32, "#00ff00");
}