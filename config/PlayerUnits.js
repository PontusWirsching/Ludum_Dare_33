PlayerUnits = {
    KoboldRunner : {
        type: "monster",
        Name: "KoboldRunner",
        Cost: 10,
        Size: GameTypes.Sizes.Small,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Fast,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.Melee],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 81,
        height: 81,
        xOffset: 0,
        yOffset: 0,
        hp: 20,
        attack: 5
    },
    KoboldSap : {
        type: "monster",
        Name: "KoboldSap",
        Cost: 20,
        Size: GameTypes.Sizes.Small,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Fast,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.Melee],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 81,
        height: 81,
        xOffset: 0,
        yOffset: 0,
        hp: 30,
        attack: 10
    },
    Goblin : {
        type: "monster",
        Name: "Goblin",
        Cost: 15,
        Size: GameTypes.Sizes.Small,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Medium,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.Melee],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 81,
        height: 81,
        xOffset: 0,
        yOffset: 0,
        hp: 40,
        attack: 7
    },
    OrcSpearThrower : {
        type: "monster",
        Name: "OrcSpearThrower",
        Cost: 15,
        Size: GameTypes.Sizes.Small,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Medium,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.Melee],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 81,
        height: 81,
        xOffset: 0,
        yOffset: 0,
        hp: 40,
        attack: 7
    },
    MossGolem : {
        type: "monster",
        Name: "MossGolem",
        Cost: 30,
        Size: GameTypes.Sizes.Medium,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Slow,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.Melee],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 201,
        height: 201,
        xOffset: 0,
        yOffset: 21,
        hp: 60,
        attack: 15
    },
    RockQuarry : {
        type: "monster",
        Name: "RockQuarry",
        Cost: 40,
        Size: GameTypes.Sizes.Large,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Slow,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.RangedAOE],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 201,
        height: 201,
        xOffset: 0,
        yOffset: -14,
        hp: 100,
        attack: 20
    },
    ThunderDrake : {
        type: "monster",
        Name: "ThunderDrake",
        Cost: 80,
        Size: GameTypes.Sizes.Large,
        Faction: GameTypes.Faction.Player,
        MovementSpeed: GameTypes.Speeds.Slow,
        AttackSpeed: GameTypes.Speeds.Medium,
        ArmorTypes: GameTypes.ArmorTypes.Light,
        AttackTypes: [GameTypes.AttackTypes.MeleeAOE],
        AdvantageTo: [],
        DisadvantageTo: [],
        width: 301,
        height: 301,
        xOffset: 0,
        yOffset: 0,
        hp: 80,
        attack: 40
    }
};