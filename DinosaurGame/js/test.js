const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let fps, Play, sprite, sol, cloud, trex, cactus, fin,score = 0;
const velocity = 5;
const init = () => {


    // SPRITE
    sprite = new Image();
    sprite.src = "../assets/sprite.png";

    // SOL
    sol = {
        x: 0,y: 220,
        draw() {
            var pat = ctx.createPattern(sprite, "repeat-x");
            ctx.save();
            ctx.translate(this.x, 100);
            ctx.fillStyle = pat;
            ctx.fillRect(0, 100, sprite.width * 1000, sprite.height);
            ctx.restore();
            // MOVE
            this.x -= velocity;

            score ++
            ctx.font = "10px arial";
            ctx.fillStyle = "black";
            ctx.fillText("Score : " + score, 380, 20);
        }
    }
    // CLOUD
    // Mes sprites sont sur une seul image, donc je choisie  celui que je veux
    // Il peut y avoir qu'un seul nuage dans le canvas qui apparaît alétoirement en fonction de y avec le même x
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
            // CREATE
            this.create();
            // DRAW
            for (i = 0; i < this.copy.length; i++) {
                ctx.drawImage(sprite, this.sx, 0, 100, 100, this.copy[i].x, this.copy[i].y, this.w, this.h);
                // MOVE
                this.copy[i].x -= velocity/2;
            }
        }
    }
    // T-REX
    trex = {
        x: 100,y: 0,w: 50,h: 50,yv: 0,sx: 100 * 7,sy: 0,sw: 100,sh: 100,jumping: false,onGround: false,col: false,
        animation: {scene: 0,ready: true,delay: 50,
        // 3 différentes animations quand il cours
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
                    if (trex.jumping) {
                        trex.sx = this.jump;
                    }
                    setTimeout(() => {
                        this.ready = true;
                    }, this.delay);
                }
            }
        },
        draw() {
            // UPDATE
            this.animation.animate();
            this.move();
            this.collision();
            // DRAW
            ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);
            //console.log(this.x);
        },
        move() {
            // Evènements saut avec la barre d'espace
            onkeydown = (e) => {
                // JUMP
                if (e.keyCode == 32 && trex.onGround) {
                    trex.onGround = false;
                    trex.jumping = true;
                    trex.yv = -11;
                }
            }
            onkeyup = (e) => {
                // JUMP
                if (e.keyCode == 32) {
                    trex.jumping = false;
                }
            }
            // Gravité en fonction du sol
            if (!this.onGround) {
                this.yv += 0.5;
            }
            // UPDATE
            this.y += this.yv;
        },
        collision() {
            // collison trex && sol
            if (this.y + this.h > sol.y) {
                this.y = sol.y - this.h;
                this.onGround = true;
            }
        }
    }
    // Cactus
    cactus = {
        y : 170,w: 45, h: 45, sx : 500, copy: [],
        create() {
            if (this.copy.length == 0) {
                this.copy.push({
                    x: canvas.width,
                    y: 170
                });
            } else {
                if (this.copy[this.copy.length - 1].x < 0) {
                    this.copy.push({
                        x: canvas.width,
                        y: 170
                    });
                }
            }
        },
        draw() {
            // CREATE
            this.create();
            // DRAW
            let compteur = 0;
            for (i = 0; i < this.copy.length; i++) {
                ctx.drawImage(sprite, this.sx, 0, 100, 100, this.copy[i].x, this.copy[i].y, this.w, this.h);
                compteur++;
                // MOVE
                this.copy[i].x -= 5;
               if(((trex.x + trex.w-9 >= this.copy[i].x) && (trex.x <= this.copy[i].x + this.w-10)) && ((trex.y + trex.h-10 >= this.copy[i].y+10) && (trex.y <= this.copy[i].y+10 + this.h))) {
                console.log("col");
                Play = false;
               }
            }
        }
    },
    fin = {
        x : 200, y : 50, w:50, h: 50, sx:0, sy :0,sw : 100, sh: 100,
        draw() {
            ctx.drawImage(sprite, this.sx,this.sy, this.sw, this.sh, this.x, this.y, this.w, this.h);

            ctx.font = "10px arial";
            ctx.fillStyle = "black";
            ctx.fillText("Appuyer sur F5 pour recommencer", 145, 95);
        }
    }
    // Boucle principale
    fps = 60;
    Play = true;
    setInterval(() => {
        requestAnimationFrame(update);
    }, 1000/fps);
 }

init();
const update = () => {
    if (Play) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacement du canvas --> Obligatoire

        // DRAW
        sol.draw();
        cloud.draw();
        trex.draw();
        cactus.draw();

    }
    else {
        fin.draw();
    }
}
