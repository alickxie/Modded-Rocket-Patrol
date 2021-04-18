class Menu1 extends Phaser.Scene {
    constructor() {
        super("menuScene1");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUIsize -
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'Use (A)(D) to move & (W) to fire',
            menuConfig).setOrigin(0.5);
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUIsize +
            borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUIsize * 2 +
            borderPadding * 2, 'Press ↓ for Two-Player-Mod', menuConfig).setOrigin(0.5);

        // Display the highscore text on the menu screen
        this.add.text(borderUIsize + borderPadding * 17, borderUIsize + borderPadding * 2, 'HighScore: ',
            menuConfig);
        this.scoreRight = this.add.text(borderUIsize + borderPadding * 34, borderUIsize + borderPadding * 2, high_Score,
            menuConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene1');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hare mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene1');
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.sound.play('sfx_select');
            this.scene.start('menuScene2');
        }
    }
}

class Menu2 extends Phaser.Scene {
    constructor() {
        super("menuScene2");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }

    create() {

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // show menu text
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUIsize -
            borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, 'P1: Use (A)(D) to move & (W) to fire',
            menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUIsize +
            borderPadding, 'P2: Use (←)(→) to move & (↑) to fire', menuConfig).setOrigin(0.5);
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUIsize * 2 +
            borderPadding * 2, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // Display the highscore text on the menu screen
        this.add.text(borderUIsize + borderPadding * 17, borderUIsize + borderPadding * 2, 'HighScore: ',
            menuConfig);
        this.scoreRight = this.add.text(borderUIsize + borderPadding * 34, borderUIsize + borderPadding * 2, high_Score,
            menuConfig);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene2');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hare mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene2');
        }
    }
}