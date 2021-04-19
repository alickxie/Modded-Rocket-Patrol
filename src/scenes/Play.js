class SinglePlayer extends Phaser.Scene {
    constructor() {
        super("playScene1");
    }

    // init(), preload
    preload() {
        //load iamges/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spaceship', './assets/spaceship.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 46,
            frameHeight: 41,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width,
            borderUIsize * 2, 0x6EDCFA).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin
            (0, 0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width,
            borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin
            (0, 0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.
            config.height, 0xFFFFFF).setOrigin
            (0, 0);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });


        // add rocket (Player 1)
        this.p1Rocket = new Rocket1(this, game.config.width / 2, game.config.height -
            borderUIsize - borderPadding * 2.5, 'rocket').setOrigin(0.5, 0);

        // add sapceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize * 6, borderUIsize * 4,
            'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize * 3, borderUIsize * 5 +
            borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize * 6 + borderPadding * 4,
            'spaceship', 0, 10).setOrigin(0, 0);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // initial score
        this.p1Score = 0;
        this.highScore = high_Score;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#46E0C9',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scoreLeft = this.add.text(borderUIsize + borderPadding, borderUIsize + borderPadding * 2, this.p1Score,
            scoreConfig);

        // Display the highscore text
        this.add.text(borderUIsize + borderPadding * 17, borderUIsize + borderPadding * 2, 'HighScore: ',
            scoreConfig);
        this.scoreRight = this.add.text(borderUIsize + borderPadding * 34, borderUIsize + borderPadding * 2, this.highScore,
            scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.starfield.tilePositionX -= starSpeed;

        // update the sprite
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene1");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temprorarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;

        // Check if the current score exceed the highscore 
        if (this.p1Score > this.highScore) {
            this.highScore = this.p1Score;
            high_Score = this.highScore;
        }

        // Adress the display score with current scores
        this.scoreLeft.text = this.p1Score;
        this.scoreRight.text = this.highScore;
        this.sound.play('sfx_explosion');
    }
}

class TwoPlayer extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    // init(), preload
    preload() {
        //load iamges/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 46,
            frameHeight: 41,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUIsize + borderPadding, game.config.width,
            borderUIsize * 2, 0x6EDCFA).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUIsize, 0xFFFFFF).setOrigin
            (0, 0);
        this.add.rectangle(0, game.config.height - borderUIsize, game.config.width,
            borderUIsize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUIsize, game.config.height, 0xFFFFFF).setOrigin
            (0, 0);
        this.add.rectangle(game.config.width - borderUIsize, 0, borderUIsize, game.
            config.height, 0xFFFFFF).setOrigin
            (0, 0);

        // add rocket (Player x2)
        this.p1Rocket = new Rocket1(this, game.config.width / 4, game.config.height -
            borderUIsize - borderPadding * 2.5, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket2(this, game.config.width / 2, game.config.height -
            borderUIsize - borderPadding * 2.5, 'rocket2').setOrigin(0.5, 0);

        // add sapceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUIsize * 6, borderUIsize * 4,
            'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUIsize * 3, borderUIsize * 5 +
            borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUIsize * 6 + borderPadding * 4,
            'spaceship', 0, 10).setOrigin(0, 0);

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // initial score
        this.p1Score = 0;
        this.p2Score = 0;
        this.highScore = high_Score;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#46E0C9',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        scoreConfig.color = '#FFEB3B';
        this.add.text(borderUIsize + borderPadding * 2, borderUIsize + borderPadding * 2, 'P1: ',
            scoreConfig);
        scoreConfig.color = '#843605';
        this.scoreLeft = this.add.text(borderUIsize + borderPadding * 7, borderUIsize + borderPadding * 2, this.p1Score,
            scoreConfig);

        this.add.text(borderUIsize + borderPadding * 17, borderUIsize + borderPadding * 2, 'HighScore: ',
            scoreConfig);
        this.scoreMid = this.add.text(borderUIsize + borderPadding * 34, borderUIsize + borderPadding * 2, this.highScore,
            scoreConfig);

        scoreConfig.color = '#F44336';
        this.add.text(borderUIsize + borderPadding * 44, borderUIsize + borderPadding * 2, 'P2: ',
            scoreConfig);
        scoreConfig.color = '#843605';
        this.scoreRight = this.add.text(borderUIsize + borderPadding * 49, borderUIsize + borderPadding * 2, this.p2Score,
            scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.starfield.tilePositionX -= starSpeed;

        // update the sprite
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();

            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03, 1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, 1);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, 1);
        }

        if (this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03, 2);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, 2);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, 2);
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene1");
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, rocket) {
        // temprorarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        if (rocket == 1) {
            // score add and repaint
            this.p1Score += ship.points;

            if (this.p1Score > this.highScore) {
                this.highScore = this.p1Score;
                high_Score = this.highScore;
            }

            this.scoreLeft.text = this.p1Score;
            this.scoreMid.text = this.highScore;
        }

        if (rocket == 2) {
            // score add and repaint
            this.p2Score += ship.points;

            if (this.p2Score > this.highScore) {
                this.highScore = this.p2Score;
                high_Score = this.highScore;
            }

            this.scoreRight.text = this.p2Score;
            this.scoreMid.text = this.highScore;
        }
        this.sound.play('sfx_explosion');
    }
}