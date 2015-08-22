function GameEntityParser(game){}
GameEntityParser.GetEntity = function(entityName){
    for(var playerUnit in PlayerUnits){
        if(playerUnit.Name == entityName){
            return new GameEntity(game, playerUnit.Name);
        }
    }
}
GameEntityParser.BuildPlayerEntityMenu = function(game){
    for(var playerUnit in PlayerUnits){
        var unit = game.add.sprite(0 * GameSettings.TileSize + 16, 0 * GameSettings.TileSize + 16, PlayerUnits[playerUnit].Name, 'Walk_000.png');
        unit.anchor.setTo(0.5, 0.5);
    }
}