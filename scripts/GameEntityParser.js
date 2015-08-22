function GameEntityParser(game){}
GameEntityParser.GetEntity = function(entityName){
    for(var playerUnit in PlayerUnits){
        if(playerUnit.Name == entityName){
            return new GameEntity(game, playerUnit.Name);
        }
    }
}
GameEntityParser.BuildPlayerEntityMenu = function(game){
    var column = 22;
    var maxColumn = 23;
    var row = 3;
    
    for(var playerUnit in PlayerUnits){
        if(column > maxColumn){
            column = 22;
            row++;
        }
        
//        if(PlayerUnits[playerUnit].Size == GameTypes.Sizes.Medium){
//            column = 22;
//            row++;
//        }
        
        if(PlayerUnits[playerUnit].Size == GameTypes.Sizes.Large){
            column = 22;
            row+=2;
        }
        
        var unit = game.add.sprite(column * GameSettings.TileSize + GameSettings.TileSize / 2, 
                                   row * GameSettings.TileSize + GameSettings.TileSize / 2, 
                                   PlayerUnits[playerUnit].Name, 'Walk_000.png');
        unit.anchor.setTo(0.5, 0.5);
        
        column++;
    }
}