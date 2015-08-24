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
            var r = Math.floor(Math.random() * 5);

            switch (r) {
            	case 0:
            		unit = AIUnits.ElvenArcher;
            		break;
            	case 1:
            		unit = AIUnits.DwarvenKnight;
            		break;
            	case 2:
            		unit = AIUnits.Cannoneer;
            		break;
            	case 3:
            		unit = AIUnits.BlazitMage;
            		break;
            	case 4:
            		unit = AIUnits.TimberMech;
            		break;
            }

            unit = AIUnits.ElvenArcher;


			currentLevel.addEntity(new Entity(x, y, unit, this.game));

			this.timer = 0;
		}

	}

}