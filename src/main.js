// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, SinglePlayer, TwoPlayer]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUIsize = game.config.height / 15;
let borderPadding = borderUIsize / 3;
let starSpeed = 3;

// reserve keyboard bindings
let keyUP, keyLEFT, keyRIGHT, keyW, keyA, keyD, keyR;

// reserve for highScore
let high_Score = 0;