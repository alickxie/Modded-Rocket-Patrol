// Rocket1 (player1) prefab
class Rocket1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.settings.spaceshipSpeed;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }


    update() {
        // left/right movement
        if (true) {
            if (keyA.isDown && this.x >= borderUIsize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUIsize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); // play the rocket sfxs
        }
        // if fired. move the rocket up
        if (this.isFiring && this.y >= borderUIsize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUIsize * 3 + borderPadding){
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUIsize - borderPadding*2.5;
    }
}

// Rocket2 (player2) prefab
class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = game.settings.spaceshipSpeed;

        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }


    update() {
        // left/right movement
        if (true) {
            if (keyLEFT.isDown && this.x >= borderUIsize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUIsize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); // play the rocket sfxs
        }
        // if fired. move the rocket up
        if (this.isFiring && this.y >= borderUIsize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUIsize * 3 + borderPadding){
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUIsize - borderPadding*2.5;
    }
}