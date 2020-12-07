window.addEventListener("load", event => main());
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let w1 = 700;
let h1 = 300;

let n = 10;



const w = canvas.width;
const h = canvas.height;

let play = true
const max = 30;
const min = 60;
//let x = Math.floor(Math.random() * (max-min + 1)) + min;
//let y = Math.floor(Math.random() * (max-min + 1)) + min;
/*rect =  {
    x:Math.floor(Math.random() * (700-0 + 1)) + 0, 
    y:Math.floor(Math.random() * (300-0 + 1)) + 0,
    w:Math.floor(Math.random() * (max-min + 1)) + min, 
    h:Math.floor(Math.random() * (max-min + 1)) + min,
    color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    draw(){
            if((this.x + this.w < w-20 ) || (this.y + this.h < h-20)){

            ctx.beginPath();
            ctx.rect(this.x, this.y, this.w, this.h);
            ctx.fillStyle = this.color;
            ctx.fill();

            }
            if((this.x + this.w > w ) || (this.y + this.h > h))
                console.log("debordement ");
                play = false;
           
    }
}
*/
r = {
    copy: [],
    create() {
        
            while(this.copy.length < 2){
                this.copy.push({
                    w:Math.floor(Math.random() * (max-min  + 1)) + min, 
                    h:Math.floor(Math.random() * (max-min + 1)) + min,
                    x:Math.floor(Math.random() * (700-0 + 1)) + 0, 
                    y:Math.floor(Math.random() * (300-0 + 1)) + 0, 
                    color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            
                })
            }
    },
    draw(){
        this.create();
        for(i=0; i<this.copy.length; i++) {
            //if(((this.copy[i].x + this.copy[i].w < this.copy[i+1].x && (this.copy[i].x > this.copy[i+1].x + this.copy[i+1].w)) (this.copy[i].y + this.copy[i].h < this.copy[i+1].y) &&(this.copy[i].y > this.copy[i+1].y + this.copy[i+1].h))){
               ctx.beginPath();
                ctx.rect(this.copy[i].x, this.copy[i].y,this.copy[i].w, this.copy[i].h);
                ctx.fillStyle = this.copy[i].color;
                ctx.fill();
        }
    }
}


const main = () => {
   
    r.draw();
}
   