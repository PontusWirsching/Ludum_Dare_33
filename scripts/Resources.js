function Resources(){}
Resources.Load = function(game){
    for(var playerUnit in PlayerUnits){
        game.load.atlasJSONHash(PlayerUnits[playerUnit].Name, 
                                'Assets/' + PlayerUnits[playerUnit].Name + '.png', 
                                'Assets/' + PlayerUnits[playerUnit].Name + '.json');
    }
}