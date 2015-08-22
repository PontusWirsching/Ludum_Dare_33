function GameEntity(game, spriteSheet){
    Phaser.Sprite.call(this, game, 0, 0, spriteSheet, 'Walk0.png');
    this.name = "";
    this.cost = 0;
    this.size = GameTypes.Sizes.Small;
    this.faction = GameTypes.Faction.None;
    this.movementSpeed = GameTypes.Speeds.None;
    this.attackSpeed = GameTypes.Speeds.None;
    this.armorType = GameTypes.ArmorTypes.None;
    this.attackType = [];
    this.advantageTo = [];
    this.disadvantageTo = [];
        
    this.runningDirection = GameTypes.RunningDirections.None;
    
    this.create = function(){
        this.runningDirection = this.GetRunningDirection();
        
    }
    
    this.GetRunningDirection = function(){
        if(this.faction == GameTypes.Faction.Player)
            return GameTypes.RunningDirections.Left;
        else if(this.faction == GameTypes.Faction.Enemy)
            return GameTypes.RunningDirections.Right;
    }
    
    this.update = function(){
        
    }
    
}