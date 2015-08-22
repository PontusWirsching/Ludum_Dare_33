var game = new Phaser.Game(768, 576, Phaser.AUTO, '', { preload: preload, create: create, update: update });
function preload() {
    game.load.image('grassTile', 'assets/GrassTile.png');
    game.load.image('level_01', 'assets/Level1.png');

    Resources.Load(game);
}

function create() {
    
    
    var level1 = new Level(game, "level_01");
    
    
    BuildLevel();
    GameEntityParser.BuildPlayerEntityMenu(game);    
}

function BuildLevel(){
        
    
    
    for(var x = GameSettings.LevelWidthStart;x < GameSettings.LevelWidth; x++){
        for(var y = GameSettings.LevelHeightStart; y < GameSettings.LevelHeight; y++){
            //this.grassTile = game.add.sprite(x * 32, y * 32, 'grassTile');
        }
    }
}

function update() {
    
}