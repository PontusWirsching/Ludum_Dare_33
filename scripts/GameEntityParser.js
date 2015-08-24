function GameEntityParser(game){
    this.units = [];
    this.GetEntity = function(entityName){
        for(var playerUnit in PlayerUnits){
            if(playerUnit.Name == entityName){
                return new GameEntity(game, playerUnit.Name);
            }
        }
    }
    
    this.BuildPlayerEntityMenu = function(game){
        var column = 22;
        var maxColumn = 23;
        var row = 3;

        for(var playerUnit in PlayerUnits){
            if(column > maxColumn){
                column = 22;
                row++;
            }

            if(PlayerUnits[playerUnit].Size == GameTypes.Sizes.Large){
                column = 22;
                row+=2;
            }

            var unit = game.add.sprite(column * GameSettings.TileSize + GameSettings.TileSize / 2, 
                                       row * GameSettings.TileSize + GameSettings.TileSize / 2, 
                                       PlayerUnits[playerUnit].Name, 'Walk_000.png');   
            unit.anchor.setTo(0.5, 0.5);
           


            this.units.push(new Unit(column * GameSettings.TileSize,
                                     row * GameSettings.TileSize, 
                                     GetPlayerUnitIndexFromName(PlayerUnits[playerUnit].Name),
                                     PlayerUnits[playerUnit].Size));
            column++;
        }
    }
}

function GetPlayerUnitIndexFromName(playerUnitName){
    switch(playerUnitName){
        case "KoboldRunner":
            return GameTypes.PlayerUnits.KoboldRunner;
        case "KoboldSap":
            return GameTypes.PlayerUnits.KoboldSap;
        case "Goblin":
            return GameTypes.PlayerUnits.Goblin;
        case "OrcSpearThrower":
            return GameTypes.PlayerUnits.OrcSpearThrower;
        case "MossGolem":
            return GameTypes.PlayerUnits.MossGolem;
        case "RockQuarry":
            return GameTypes.PlayerUnits.RockQuarry;
    }
}

function Unit(x, y, type, size){
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = size;
}