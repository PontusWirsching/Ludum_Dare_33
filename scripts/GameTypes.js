function GameTypes(){}
GameTypes.Faction = {
    None:-1,
    Player:0,
    Enemy:1
}

GameTypes.Speeds = {
    None:-1,
    Slow:0,
    Medium:1,
    Fast:2
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