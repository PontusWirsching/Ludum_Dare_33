function GameEntityParser(game){
    this.units = [];
    this.currentlySelected = "";
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
            unit.inputEnabled = true;
            game.physics.arcade.enable(unit);
            unit.body.setSize(32, 32, 0, 0);
            this.units.push(unit);
            column++;
        }
    }
    
    this.GetCurrentlySelectedUnit = function(){
        for(var i=0;i < this.units.length; i++){
            if(this.units[i].input.pointerDown())
                this.currentlySelected = this.units[i].key;
        }
    }
}