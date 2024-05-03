import {constants} from '../constants/constants'

export class Ball{
    constructor(){
        this.radius=constants.ball.radius;
        this.x=constants.court.canvasWidth*0.75;
        this.y=-(constants.court.canvasHeight)+300;
        this.vX=0;
        this.vY=0;
        this.aY=constants.ball.gravity;
    }

    updatePosition(){
        const t=0.5;
        const t2=0.25;
        this.y=this.y +  (this.vY * t + 0.5*this.aY*t2);
        this.vY=this.vY+ this.aY*t;

        if(this.vY < -1*constants.ball.vYMax){
            this.vY=-1*constants.ball.vYMax
        }
        else if(this.vY > constants.ball.vYMax){
            this.vY=constants.ball.vYMax
        }
        if(this.vX > constants.ball.vXMax){
            this.vX=constants.ball.vXMax
        }
        else if(this.vX < -1*constants.ball.vXMax){
            this.vX=-1*constants.ball.vXMax
        }

        if(this.y+this.radius>=0){
            this.y=-this.radius-1;
            this.vY=this.vY*-1
        }

        else if(-1*(this.y)+this.radius >= constants.court.gameHeight){
            this.y=-1*(constants.court.gameHeight-this.radius-1)
            this.vY=this.vY*-1
        }

        if((this.x-this.radius)<=0){
            this.x=this.radius+1;
            this.vX*=-1;
        }
        else if(this.x+this.radius>=constants.court.canvasWidth){
            this.x=constants.court.canvasWidth-constants.ball.radius-1;
            this.vX*=-1;
        }
        this.x=this.x + this.vX*t;
        // console.log("BVXX ",this.vX)
        // console.log("BVYY ",this.vY)    
    }

    draw(ctx, elapsed){
        ctx.beginPath();
        // console.log("bbb", this.y+"  "+this.vY)
        ctx.arc(this.x, this.y, this.radius, Math.PI, -Math.PI);
        ctx.fillStyle = constants.ball.ballColor;
        ctx.lineWidth = 2
        ctx.strokeStyle= "white"
        ctx.fill();
        ctx.stroke();
    }
}