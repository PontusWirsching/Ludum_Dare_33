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
}

function create() {
    addLevel(this.level_01 = new Level(game, "level_01"));
    currentPlayerUnitSelected = -1;
    currentlySelectedLane = 0;
    
    setCurrentLevel("level_01");
    gui = game.add.sprite(0, 0, 'gui');
    
    overlay = game.add.bitmapData(game.width, game.height);
    game.add.sprite(0, 0, overlay);
    playerUnitOverlayLocations = GetPlayerUnitOverlayLocations();
    DrawOverlayLocation();
    
    laneOverLayLocations = GetLaneOverlayLocations();
    DrawLaneOverlayLocations();
    
    game.ai = new AI(game);
}

function DrawOverlayLocation(){
    game.add.sprite(680, 70, 'KoboldRunner_Walk', 0);
    game.add.sprite(710, 70, 'KoboldSap_Walk', 0);
    game.add.sprite(676, 105, 'Goblin_Walk', 0);
    game.add.sprite(710, 105, 'OrcSpearThrower_Walk', 0);
    game.add.sprite(620, 85, 'MossGolem_Walk', 0);
    game.add.sprite(639, 155, 'RockQuarry_Walk', 0);
}

function GetPlayerUnitOverlayLocations(){
    var playerUnitOverlayLocations = [
        new PlayerUnitOverlayLocation(700, 125, 32, 32, GameTypes.PlayerUnits.Goblin),
        new PlayerUnitOverlayLocation(700, 155, 32, 68, GameTypes.PlayerUnits.MossGolem),
        new PlayerUnitOverlayLocation(705, 223, 58, 35, GameTypes.PlayerUnits.RockQuarry),
        new PlayerUnitOverlayLocation(732, 125, 32, 32, GameTypes.PlayerUnits.OrcSpearThrower),
        new PlayerUnitOverlayLocation(732, 95, 32, 32, GameTypes.PlayerUnits.KoboldSap),
        new PlayerUnitOverlayLocation(700, 95, 32, 32, GameTypes.PlayerUnits.KoboldRunner),
    ];
    
    
    return playerUnitOverlayLocations;
}

function GetLaneOverlayLocations(){
    var laneOverLayLocations = [
        new LaneOverlayLocation(163, 96, 540, 30, 1),
        new LaneOverlayLocation(163, 160, 540, 30, 2),
        new LaneOverlayLocation(163, 225, 540, 30, 3),
        new LaneOverlayLocation(163, 288, 540, 30, 4),
        new LaneOverlayLocation(163, 353, 540, 30, 5),
        new LaneOverlayLocation(163, 416, 540, 30, 6),
        new LaneOverlayLocation(163, 480, 540, 30, 7),
    ];
    
    return laneOverLayLocations;
}

var timer = 0;

function update() {
    overlay.clear();
    
    if(game.input.activePointer.isDown){
        currentPlayerUnitSelected = GetCurrentSelectedPlayerUnit(currentPlayerUnitSelected);
        currentlySelectedLane = GetCurrentlySelectedLane(currentlySelectedLane);
    }
    
    //Keyboard keys
    if(game.input.keyboard.isDown(Phaser.Keyboard.ONE))
        currentPlayerUnitSelected = 5;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.TWO))
        currentPlayerUnitSelected = 4;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.THREE))
        currentPlayerUnitSelected = 0;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.FOUR))
        currentPlayerUnitSelected = 3;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE))
        currentPlayerUnitSelected = 1;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.SIX))
        currentPlayerUnitSelected = 2;
    
    if (currentLevel != null){


        if (game.ai != null) {
            game.ai.update(currentLevel);
        }

        timer += 1;
        if (timer >= 60) {
            var type = 0;
            var x = game.world.width - 64;
            var y = currentLevel.lanes[currentlySelectedLane - 1] + currentLevel.laneOffset;

            switch(currentPlayerUnitSelected) {
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
           
            if(type != 0){
                currentLevel.addEntity(new Entity(x, y, type, game));
                currentPlayerUnitSelected = GameTypes.PlayerUnits.NotSelected;
                DrawCurrentSelectionBoxForPlayerUnit(currentPlayerUnitSelected);
            }

            game.world.bringToTop(currentLevel.tree_tops);
            
            timer = 0;
        }

        currentLevel.update();
    }
    
    DrawCurrentSelectionBoxForPlayerUnit(currentPlayerUnitSelected);
    DrawLaneOverlayLocations(currentlySelectedLane);
}

function GetCurrentSelectedPlayerUnit(currentlySelected){    
    for(var i=0;i<playerUnitOverlayLocations.length;i++){  
        if(MouseOverlapsLocation(playerUnitOverlayLocations[i],
                                 game.input.mouse.input.x,
                                 game.input.mouse.input.y)){
            return playerUnitOverlayLocations[i].unit;
        }
    }
    return currentlySelected;
}

function GetCurrentlySelectedLane(currentlySelected){
    for(var i=0;i<laneOverLayLocations.length;i++){
        if(game.input.activePointer.isDown){
            if(MouseOverlapsLocation(laneOverLayLocations[i],
                                     game.input.mouse.input.x,
                                     game.input.mouse.input.y)){
                return laneOverLayLocations[i].laneNumber;
            }
        }
    }
    return currentlySelected;
}

function DrawLaneOverlayLocations(currentlySelected){
    for(var i=0;i<laneOverLayLocations.length;i++){
        var overlayLocation = laneOverLayLocations[i];
        if(overlayLocation.laneNumber == currentlySelected){
            DrawRectangle(overlayLocation.x,
                          overlayLocation.y,
                          overlayLocation.width,
                          overlayLocation.height);
        }
    }
}

function DrawCurrentSelectionBoxForPlayerUnit(currentlySelected){
    for(var i=0;i<playerUnitOverlayLocations.length;i++){
        var overlayLocation = playerUnitOverlayLocations[i];
        if(overlayLocation.unit == currentlySelected){
            DrawRectangle(overlayLocation.x,
                          overlayLocation.y,
                          overlayLocation.width,
                          overlayLocation.height);
        }
    }
}

function DrawRectangle(x, y, w, h){
    overlay.ctx.beginPath();
    overlay.ctx.rect(x, y, w, h);
    overlay.ctx.strokeStyle = '#00ff00';
    overlay.ctx.stroke();
}

function MouseOverlapsLocation(overlayLocation, mouseX, mouseY){
    return (mouseX > overlayLocation.x && mouseX < overlayLocation.x + overlayLocation.width &&
            mouseY > overlayLocation.y && mouseY < overlayLocation.y + overlayLocation.height);
}

function PlayerUnitOverlayLocation(x, y, w, h, unit){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.unit = unit;
}

function LaneOverlayLocation(x, y, w, h, laneNumber){
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.laneNumber = laneNumber;
}