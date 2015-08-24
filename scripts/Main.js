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
    game.load.spritesheet('KoboldRunner_Attack', 'assets/Entities/KoboldRunner_Attack.png', 81, 81);
    game.load.spritesheet('KoboldRunner_Death', 'assets/Entities/KoboldRunner_Death.png', 81, 81);
    
    game.load.spritesheet('KoboldSap_Walk', 'assets/Entities/KoboldSap_Walk.png', 81, 81);
    game.load.spritesheet('KoboldSap_Attack', 'assets/Entities/KoboldSap_Attack.png', 81, 81);
    game.load.spritesheet('KoboldSap_Death', 'assets/Entities/KoboldSap_Death.png', 81, 81);
    
    game.load.spritesheet('Goblin_Walk', 'assets/Entities/Goblin_Walk.png', 81, 81);
    game.load.spritesheet('Goblin_Attack', 'assets/Entities/Goblin_Attack.png', 81, 81);
    game.load.spritesheet('Goblin_Death', 'assets/Entities/Goblin_Death.png', 81, 81);
    
    game.load.spritesheet('OrcSpearThrower_Walk', 'assets/Entities/OrcSpearThrower_Walk.png', 81, 81);
    game.load.spritesheet('OrcSpearThrower_Attack', 'assets/Entities/OrcSpearThrower_Attack.png', 81, 81);
    game.load.spritesheet('OrcSpearThrower_Death', 'assets/Entities/OrcSpearThrower_Death.png', 81, 81);
    
    game.load.spritesheet('MossGolem_Walk', 'assets/Entities/MossGolem_Walk.png', 201, 201);
    game.load.spritesheet('MossGolem_Attack', 'assets/Entities/MossGolem_Attack.png', 201, 201);
    game.load.spritesheet('MossGolem_Death', 'assets/Entities/MossGolem_Death.png', 201, 201);
    
    game.load.spritesheet('RockQuarry_Walk', 'assets/Entities/RockQuarry_Walk.png', 201, 201);
    game.load.spritesheet('RockQuarry_Attack', 'assets/Entities/RockQuarry_Attack.png', 201, 201);
    game.load.spritesheet('RockQuarry_Death', 'assets/Entities/RockQuarry_Death.png', 201, 201);

    game.load.spritesheet('ThunderDrake_Walk', 'assets/Entities/ThunderDrake_Walk.png', 301, 301);
    game.load.spritesheet('ThunderDrake_Attack', 'assets/Entities/ThunderDrake_Attack.png', 301, 301);
    game.load.spritesheet('ThunderDrake_Death', 'assets/Entities/ThunderDrake_Death.png', 301, 301);


    /* AI Units loading: */
    game.load.spritesheet('ElvenArcher_Walk', 'assets/Entities/ElvenArcher_Walk.png', 81, 81);
    game.load.spritesheet('ElvenArcher_Attack', 'assets/Entities/ElvenArcher_Attack.png', 601, 81);
    game.load.spritesheet('ElvenArcher_Death', 'assets/Entities/ElvenArcher_Death.png', 81, 81);

    game.load.spritesheet('DwarvenKnight_Walk', 'assets/Entities/DwarvenKnight_Walk.png', 81, 81);
    game.load.spritesheet('DwarvenKnight_Death', 'assets/Entities/DwarvenKnight_Death.png', 81, 81);

    game.load.spritesheet('Cannoneer_Walk', 'assets/Entities/Cannoneer_Walk.png', 161, 161);
    game.load.spritesheet('Cannoneer_Death', 'assets/Entities/Cannoneer_Death.png', 161, 161);

    game.load.spritesheet('BlazitMage_Walk', 'assets/Entities/BlazitMage_Walk.png', 151, 151);
    game.load.spritesheet('BlazitMage_Death', 'assets/Entities/BlazitMage_Death.png', 151, 151);

    game.load.spritesheet('TimberMech_Walk', 'assets/Entities/TimberMech_Walk.png', 301, 301);
    game.load.spritesheet('TimberMech_Death', 'assets/Entities/TimberMech_Death.png', 301, 301);


    /* GUI stuff */
    game.load.image('port_Goblin', 'assets/Portraits/Bruisa\'h.png');
    game.load.image('port_Cannoneer', 'assets/Portraits/Cannoneer.png');
    game.load.image('port_ThunderDrake', 'assets/Portraits/Drake.png');
    game.load.image('port_ElvenArcher', 'assets/Portraits/Elf.png');
    game.load.image('port_DwarvenKnight', 'assets/Portraits/Knight.png');
    game.load.image('port_RockQuarry', 'assets/Portraits/Ludum.png');
    game.load.image('port_BlazitMage', 'assets/Portraits/Mage.png');
    game.load.image('port_TimberMech', 'assets/Portraits/Mech.png');
    game.load.image('port_MossGolem', 'assets/Portraits/Moss.png');
    game.load.image('port_OrcSpearThrower', 'assets/Portraits/Orc.png');
    game.load.image('port_KoboldRunner', 'assets/Portraits/Runna\'h.png');

}

function create() {
    addLevel(this.level_01 = new Level(game, "level_01"));
    currentPlayerUnitSelected = -1;
    currentlySelectedLane = 1;
    
    
    setCurrentLevel("level_01");
    gui = game.add.sprite(0, 0, 'gui');
    
    overlay = game.add.bitmapData(game.width, game.height);
    game.add.sprite(0, 0, overlay);
    playerUnitOverlayLocations = GetPlayerUnitOverlayLocations();
    
    game.gui = game.add.group();
    game.global = {};
    game.global.playerScore = 0;
    game.global.aiScore = 0;
    game.global.monsterPoints = 500;


    DrawOverlayLocation();
    
    laneOverLayLocations = GetLaneOverlayLocations();
    DrawLaneOverlayLocations();
    
    game.ai = new AI(game, currentLevel);

}

function DrawOverlayLocation(){
    game.gui.add(game.add.sprite(680, 70, 'KoboldRunner_Walk', 0));
    game.gui.add(game.add.sprite(710, 70, 'KoboldSap_Walk', 0));
    game.gui.add(game.add.sprite(676, 105, 'Goblin_Walk', 0));
    game.gui.add(game.add.sprite(710, 105, 'OrcSpearThrower_Walk', 0));
    game.gui.add(game.add.sprite(620, 85, 'MossGolem_Walk', 0));
    game.gui.add(game.add.sprite(639, 155, 'RockQuarry_Walk', 0));
    game.gui.add(game.add.sprite(588, 160, 'ThunderDrake_Walk', 0));

}

function GetPlayerUnitOverlayLocations(){
    var playerUnitOverlayLocations = [
        new PlayerUnitOverlayLocation(700, 125, 32, 32, GameTypes.PlayerUnits.Goblin),
        new PlayerUnitOverlayLocation(700, 155, 32, 68, GameTypes.PlayerUnits.MossGolem),
        new PlayerUnitOverlayLocation(705, 223, 58, 35, GameTypes.PlayerUnits.RockQuarry),
        new PlayerUnitOverlayLocation(732, 125, 32, 32, GameTypes.PlayerUnits.OrcSpearThrower),
        new PlayerUnitOverlayLocation(732, 95, 32, 32, GameTypes.PlayerUnits.KoboldSap),
        new PlayerUnitOverlayLocation(700, 95, 32, 32, GameTypes.PlayerUnits.KoboldRunner),
        new PlayerUnitOverlayLocation(705, 264, 64, 64, GameTypes.PlayerUnits.ThunderDrake),
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

var spawnLimits = [];

function update() {
    overlay.clear();
    
    if(game.input.activePointer.isDown && spawnLimits[6]){
        spawnLimits[6] = false;
        currentPlayerUnitSelected = GetCurrentSelectedPlayerUnit(currentPlayerUnitSelected);
        currentlySelectedLane = GetCurrentlySelectedLane(currentlySelectedLane);
    } else if (!game.input.activePointer.isDown && !spawnLimits[6]) {
        spawnLimits[6] = true;
    }
    
    //Keyboard keys
    if(game.input.keyboard.isDown(Phaser.Keyboard.ONE))
        currentlySelectedLane = 1;

    if(game.input.keyboard.isDown(Phaser.Keyboard.TWO))
        currentlySelectedLane = 2;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.THREE))
        currentlySelectedLane = 3;

    if(game.input.keyboard.isDown(Phaser.Keyboard.FOUR))
        currentlySelectedLane = 4;

    if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE))
        currentlySelectedLane = 5;
        
    if(game.input.keyboard.isDown(Phaser.Keyboard.SIX))
        currentlySelectedLane = 6;
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.SEVEN))
        currentlySelectedLane = 7;
   
    if (currentLevel != null){


        if (game.ai != null) {
            game.ai.update(currentLevel);
        }

        
        var type = 0;
        var x = game.world.width;
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
            case GameTypes.PlayerUnits.ThunderDrake:
                type = PlayerUnits.ThunderDrake;
                break;
        }
       
        if(type != 0){
            if(type.Cost <= game.global.monsterPoints){

                console.log("Spawning Entity: " + type.Name + ", in lane: " + currentlySelectedLane);

                currentLevel.addEntity(new Entity(x, y, type, game));
                game.global.monsterPoints -= type.Cost;
            }
            
            currentPlayerUnitSelected = GameTypes.PlayerUnits.NotSelected;
            DrawCurrentSelectionBoxForPlayerUnit(currentPlayerUnitSelected);
        }
        
        

        game.world.bringToTop(currentLevel.tree_tops);
        game.world.bringToTop(gui);
        game.world.bringToTop(game.gui);

            

        currentLevel.update();
    }
    
    DrawCurrentSelectionBoxForPlayerUnit(currentPlayerUnitSelected);
    DrawLaneOverlayLocations(currentlySelectedLane);

    for (var i = 0; i < currentLevel.entities.length; i++) {
        var e = currentLevel.entities[i];
        DrawRectangle(e.x + e.type.width / 2 - e.hitboxWidth / 2, e.y + e.type.height / 2 - e.hitboxHeight / 2, e.hitboxWidth, e.hitboxHeight);
    }

}

function GetPlayerUnitCost(playerUnit){
    switch(playerUnit){
        case GameTypes.PlayerUnits.Goblin:
            return PlayerUnits.Goblin.Cost;
        case GameTypes.PlayerUnits.MossGolem:
            return PlayerUnits.MossGolem.Cost;
        case GameTypes.PlayerUnits.RockQuarry:
            return PlayerUnits.RockQuarry.Cost;
        case GameTypes.PlayerUnits.OrcSpearThrower:
            return PlayerUnits.OrcSpearThrower.Cost;
        case GameTypes.PlayerUnits.KoboldSap:
            return PlayerUnits.KoboldSap.Cost;
        case GameTypes.PlayerUnits.KoboldRunner:
            return PlayerUnits.KoboldRunner.Cost;
        case GameTypes.PlayerUnits.ThunderDrake:
            return PlayerUnits.ThunderDrake.Cost;
    }
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

function render(){
    game.debug.text("Monster Points : " + game.global.monsterPoints, 550, 16, "#00ff00");
    game.debug.text("Player Score : " + game.global.playerScore, 550, 32, "#00ff00");
    game.debug.text("Computer Score : " + game.global.aiScore, 550, 48, "#00ff00");

}


//Utility Methods and class below
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