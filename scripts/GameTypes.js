function GameTypes(){}
GameTypes.Faction = {
    None:-1,
    Player:0,
    Enemy:1
}

GameTypes.Speeds = {
    None: 0,
    Slow: 0.5,
    Medium: 1,
    Fast: 1.8
}
GameTypes.ArmorTypes = {
    None:-1,
    Light:0,
    Medium:1,
    Heavy:2
}
GameTypes.AttackTypes = {
    None:-1,
    Melee:0,
    MeleeAOE:1,
    Ranged:2,
    RangedAOE:3
}
GameTypes.RunningDirections = {
    None:-1,
    Left:0,
    Right:1
}
GameTypes.Sizes = {
    Small:0, //1x1
    Medium:1, //1x2
    Large:2 //2x2
}
GameTypes.PlayerUnits = {
    NotSelected:-1,
    Goblin:0,
    MossGolem:1,
    RockQuarry:2,
    OrcSpearThrower:3,
    KoboldSap:4,
    KoboldRunner:5
}