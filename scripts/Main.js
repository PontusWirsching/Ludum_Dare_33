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


    /* AI Units loading: */
    game.load.spritesheet('ElvenArcher_Walk', 'assets/Entities/ElvenArcher_Walk.png', 81, 81);




    Resources.Load(game);
}

function create() {
    
    
    addLevel(this.level_01 = new Level(game, "level_01"));


    entityParser = new GameEntityParser();
    entityParser.BuildPlayerEntityMenu(game);
    currentlySelected = 0;
    
    overlay = game.add.bitmapData(game.width, game.height);
    game.add.sprite(0, 0, overlay);
    overlayLocations = GetOverlayLocations();


    setCurrentLevel("level_01");
}


function GetOverlayLocations(){
    var overlayLocations = [
        new OverlayLocation(700, 125, 32, 32, GameTypes.PlayerUnits.Goblin),
        new OverlayLocation(700, 155, 32, 53, GameTypes.PlayerUnits.MossGolem),
        new OverlayLocation(685, 205, 64, 35, GameTypes.PlayerUnits.RockQuarry),
        new OverlayLocation(732, 125, 32, 32, GameTypes.PlayerUnits.OrcSpearThrower),
        new OverlayLocation(732, 95, 32, 32, GameTypes.PlayerUnits.KoboldSap),
        new OverlayLocation(700, 95, 32, 32, GameTypes.PlayerUnits.KoboldRunner),
    ];
    
    
    return overlayLocations;
    gui = game.add.sprite(0, 0, 'gui');

    game.ai = new AI(game);

}

var timer = 0;

function update() { 
    for(var i=0;i<overlayLocations.length;i++){
        if(game.input.activePointer.isDown){
            if(MouseOverlapsLocation(overlayLocations[i],
                                     game.input.mouse.input.x,
                                     game.input.mouse.input.y)){
                currentlySelected = overlayLocations[i].unit;
            }
        }
    }
    
    SetCurrentSelectionBox(currentlySelected);
    
    if (currentLevel != null){


        if (game.ai != null) {
            game.ai.update(currentLevel);
        }

        timer += 1;
        if (timer >= 60) {


            var type = PlayerUnits.Goblin;
            var lane = Math.round(Math.random() * (currentLevel.lanes.length - 1));
            var x = game.world.width;
            var y = currentLevel.lanes[lane - 1] + currentLevel.laneOffset;
           
            var r = currentlySelected; //Math.round(Math.random() * 5);

            switch(r) {
                case GameTypes.PlayerUnits.Goblin:
                    type = PlayerUnits.Goblin;
                    break;
                case GameTypes.PlayerUnits.MossGolem:
                    type = PlayerUnits.MossGolem;
                    break;
                case GameTypes.PlayerUnits.RockQuarry:
                    type = PlayerUnits.RockQuarry;
                    break;
                case GameTypes.PlayerUnits.OrcSpearThrower:
                    type = PlayerUnits.OrcSpearThrower;
                    break;
                case GameTypes.PlayerUnits.KoboldSap:
                    type = PlayerUnits.KoboldSap;
                    break;
                case GameTypes.PlayerUnits.KoboldRunner:
                    type = PlayerUnits.KoboldRunner;
                    break;
            }
           

            currentLevel.addEntity(new Entity(x, y, type, game));

            game.world.bringToTop(currentLevel.tree_tops);
            game.world.bringToTop(gui);

            timer = 0;
        }

        currentLevel.update();
    }



}

function SetCurrentSelectionBox(currentlySelected){
    for(var i=0;i<overlayLocations.length;i++){
        var overlayLocation = overlayLocations[i];
        if(overlayLocation.unit == currentlySelected){
            DrawRectangle(overlayLocation.x,
                          overlayLocation.y,
                          overlayLocation.width,
                          overlayLocation.height);
        }
    }
}

function DrawRectangle(x, y, w, h){
    overlay.clear();
    overlay.ctx.beginPath();
    overlay.ctx.rect(x, y, w, h);
    overlay.ctx.strokeStyle = '#00ff00';
    overlay.ctx.stroke();
}

function MouseOverlapsLocation(overlayLocation, mouseX, mouseY){
    return (mouseX > overlayLocation.x && mouseX < overlayLocation.x + overlayLocation.width &&
            mouseY > overlayLocation.y && mouseY < overlayLocation.y + overlayLocation.height);
}

function OverlayLocation(x, y, w, h, unit){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.unit = unit;
}

function render(){
    game.debug.text("currentPlayerSelection : " + entityParser.currentlySelected, 2, 32, "#00ff00");
}