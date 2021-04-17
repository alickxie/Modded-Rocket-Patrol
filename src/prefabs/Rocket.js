// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
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
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUIsize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUIsize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
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
        this.y = game.config.height - borderUIsize - borderPadding;
    }
}