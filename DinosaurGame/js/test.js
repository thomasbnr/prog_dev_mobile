const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

var fps, Play, sprite,sol, cloud, trex, cactus;
const velocity = 5;

const init = () => {

    // SPRITE
    sprite = new Image();
    sprite.src = "../assets/sprite.png";
    let score = 0;
    // SOL
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createPattern
    sol = {
        x: 0,y: 220,
        draw() {
            var pattern = ctx.createPattern(sprite, "repeat-x");
            ctx.save();
            ctx.translate(this.x, 100);
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 100, sprite.width * 1000, sprite.height); //sprite.width * 1000 --> pour que le sol défile en continu
            ctx.restore();
            // MOVE
            this.x -= velocity;
            score ++
            ctx.font = "10px arial";
            ctx.fillStyle = "black";
            ctx.fillText("Score : " + score, 380, 20);
        }
    }


    // Nuages placés de manière aléatoire en y dans le canvas, 1 nuage dans le canvas
    cloud = {
        w: 100,h: 100,sx: 100,copy: [],
        create() {
            if (this.copy.length == 0) {
                this.copy.push({
                    x: canvas.width,
                    y: Math.floor(Math.random() * 100),
                });
            } else {
                if (this.copy[this.copy.length - 1].x < 0) {
                    this.copy.push({
                        x: canvas.width,
                        y: Math.floor(Math.random() * 100)
                    });
                }
            }
        },
        draw() {
            this.create();
            // DRAW
            for (i = 0; i < this.copy.length; i++) {
                ctx.drawImage(sprite, this.sx, 0, 100, 100, this.copy[i].x, this.copy[i].y, this.w, this.h);
                // MOVE
                this.copy[i].x -= velocity/2;
            }
        }
    }
    // T-REX && cactus
    trex = {
        cactus_w: 45, cactus_h: 45, cactus_sx : 500, cactus_copy: [],

        //T-Rex
        x: 20,y: 0,w: 50,h: 50,yv: 0,sx: 100 * 7,sy: 0,sw: 100,sh: 100,jumping: false,onGround: false, col: false,
        animation: {scene: 0,ready: true,delais: 50,
        //On récupèrent les sprites dont on a besoin pour faire nos animations
        run: [
            [100 * 7],[100 * 8],[100 * 9]],
            jump: 100 * 7,
            animate() {
                if (this.ready) {
                    this.ready = false;
                    trex.w = 50;
                    trex.sw = 100;
                    // DEFAULT
                    if (!trex.jumping) {
                        if (this.scene < this.run.length - 1) {
                            this.scene++;
                        } else {
                            this.scene = 0;
                        }
                        trex.sx = this.run[this.scene];
                    }
                    // JUMPING
                    if (trex.jumping) {
                        trex.sx = this.jump;
                    }
                    // RESET
                    setTimeout(() => {
                        this.ready = true;
                    }, this.delais);
                }
            }
        },
        create() {
            // COndition pour le premier cactus
            if (this.cactus_copy.length == 0) {
                this.cactus_copy.push({
                    cactus_x: canvas.width,
                    cactus_y: 170
                });
            } else {
                // Spawn d'un cactus en x quand il n'a plus de cactus dans le canvas
                if (this.cactus_copy[this.cactus_copy.length - 1].cactus_x < 0) {
                    this.cactus_copy.push({
                        cactus_x: canvas.width,
                        cactus_y: 170
                    });
                }
            }
        },

        draw() {
            this.create();
            // On le crée puis le dessine
            let compteur = 0;
            let speed = 5;
            for (i = 0; i < this.cactus_copy.length; i++) {
                ctx.drawImage(sprite, this.cactus_sx, 0, 100, 100, this.cactus_copy[i].cactus_x, this.cactus_copy[i].cactus_y, this.cactus_w, this.cactus_h);
                // MOVE
                this.cactus_copy[i].cactus_x -= speed;
                compteur++;

                // Niveau de difficulté --> à transformer en switch case --> plus propres
                if(compteur > 10)
                    this.cactus_copy[i].cactus_x -= speed -4;
                if (compteur >25)
                    this.cactus_copy[i].cactus_x -= speed-3;
                if (compteur > 40)
                    this.cactus_copy[i].cactus_x -= speed-2.8;
            }
            this.animation.animate();
            this.move();
            this.collision();
            // DRAW
            ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
        },
        move() {
            // evenement saut avec la barre d'espace
            onkeydown = function(event) { //--> cheat à enlever 
                // JUMP
                if (event.keyCode == 32 && trex.onGround) {
                    trex.onGround = false;
                    trex.jumping = true;
                    trex.col = false;
                    trex.yv = -11;
                }
            }
            onkeyup = function(event) {
                if (event.keyCode == 32) {
                    trex.jumping = false;
                }
            }
            // Gravité en fonction du sol
            if (!this.onGround) {
                this.yv += 0.5;
            }
            this.y += this.yv;
        },
        collision() {
            // Collison pour le sol
            if (this.y + this.h > sol.y) {
                this.y = sol.y - this.h;
                this.onGround = true;
            }
        }
    }

    // boucle principale
    fps = 60;
    Play = true;
    setInterval(() => {
        requestAnimationFrame(update);
    }, 1000/fps);
 }

init();
const update = () => {
    if (Play) {
        // Obligatoire pour effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // on déssine le sol, les nuages puis cactus et trex
        sol.draw();
        cloud.draw();
        trex.draw();
    }
}
