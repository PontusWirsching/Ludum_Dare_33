function AI(game, currentLevel) {

	this.game = game;
	this.currentLevel = currentLevel;

	this.timer = 100000;
	this.update = function(currentLevel) {

		this.timer++;
		if (this.timer >= 60 * 4) {

			var lane = Math.round(Math.random() * (currentLevel.lanes.length - 1));
            var x = currentLevel.aiSpawningXPos;
            var y = currentLevel.lanes[lane - 2] + currentLevel.laneOffset;
            var unit = AIUnits.ElvenArcher;
            var r = Math.floor(Math.random() * 4);

            switch (r) {
            	case 0:
            		unit = AIUnits.ElvenArcher;
            		break;
            	case 1:
            		unit = AIUnits.DwarvenKnight;
            		break;
            	
            	case 2:
            		unit = AIUnits.BlazitMage;
            		break;
            	case 3:
            		unit = AIUnits.TimberMech;
            		break;
                    
//                case 2:
//            		unit = AIUnits.Cannoneer;
//            		break;
            }

			currentLevel.addEntity(new Entity(x, y, unit, this.game, lane - 1));

			this.timer = 0;
		}

	}

}