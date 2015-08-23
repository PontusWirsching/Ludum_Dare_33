function AI(game) {

	this.game = game;


	this.timer = 0;
	this.update = function(currentLevel) {

		this.timer++;
		if (this.timer >= 60 / 1) {

			var lane = Math.round(Math.random() * (currentLevel.lanes.length - 1));
            var x = 128;
            var y = currentLevel.lanes[lane - 1] + currentLevel.laneOffset;

			currentLevel.addEntity(new Entity(x, y, AIUnits.ElvenArcher, this.game));

			this.timer = 0;
		}

	}

}