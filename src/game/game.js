import {Slime} from './slime';
import {OtherSlime} from './otherSlime';
import {Ball} from './ball';
import { constants } from '../constants/constants';

export class Game{
    constructor(mySlimeNo, otherSlimeNo){
        this.mySlime=new Slime(mySlimeNo);
        this.otherSlime=new OtherSlime(otherSlimeNo);
        this.ball=new Ball();
    }

    distanceBetweenBallSlime(){
        const deltaX=this.ball.x-this.mySlime.x;
        const deltaY=this.ball.y-this.mySlime.y;
        return Math.sqrt(deltaX*deltaX +deltaY*deltaY);
    }
    detectCollision(){
        if( (-1*(this.ball.y+this.ball.radius) <= -1*(this.mySlime.y-this.mySlime.radius)) && 
            ( (this.ball.x >= this.mySlime.x && (this.ball.x-this.mySlime.x < this.ball.radius+this.mySlime.radius)) ||
                (this.ball.x <= this.mySlime.x && (this.mySlime.x-this.ball.x < this.ball.radius+this.mySlime.radius))
            )
        ) {
            if(this.distanceBetweenBallSlime() <= this.ball.radius+this.mySlime.radius){
                console.log("COLLISION");
                if(this.ball.x>=this.mySlime.x){
                    const theta=Math.atan(-1*(this.ball.y-this.mySlime.y)/(this.ball.x-this.mySlime.x));
                    const alpha=Math.PI/2-theta;
                    // console.log("vx: ",this.ball.vX);
                    // console.log("vy: ",this.ball.vY);
                    // console.log("alpha: " + alpha*180/Math.PI);
                    
                    let vXn=(this.ball.vX-this.mySlime.vX)*Math.cos(alpha) + (this.ball.vY-this.mySlime.vY)*Math.sin(alpha);
                    let vYn=(this.ball.vY-this.mySlime.vY)*Math.cos(alpha) - (this.ball.vX-this.mySlime.vX)*Math.sin(alpha);
                    vYn=-1*vYn;

                    this.ball.vX=this.mySlime.vX + (vXn*Math.cos(-alpha) + vYn*Math.sin(-alpha));
                    this.ball.vY=this.mySlime.vY + (vYn*Math.cos(-alpha) - vXn*Math.sin(-alpha));


                    this.ball.x=this.mySlime.x+(this.mySlime.radius+this.ball.radius)*Math.cos(theta);
                    this.ball.y=this.mySlime.y + -1*(this.mySlime.radius+this.ball.radius)*Math.sin(theta);

                    console.log("vxn: ",this.ball.vX);
                    console.log("vyn: ",this.ball.vY);
                    
                    
                }
                else{
                    const theta=Math.atan((this.ball.y-this.mySlime.y)/(this.ball.x-this.mySlime.x));
                    const alpha=Math.PI/2-theta;
                    // console.log("vx: ",this.ball.vX);
                    // console.log("vy: ",this.ball.vY);
                    // console.log("alpha: " + alpha*180/Math.PI);

                    let vXn=(this.ball.vX-this.mySlime.vX)*Math.cos(alpha) - (this.ball.vY-this.mySlime.vY)*Math.sin(alpha);
                    let vYn=(this.ball.vY-this.mySlime.vY)*Math.cos(alpha) + (this.ball.vX-this.mySlime.vX)*Math.sin(alpha);
                    vYn=-1*vYn;


                    this.ball.vX=this.mySlime.vX + (vXn*Math.cos(-alpha) - vYn*Math.sin(-alpha));
                    this.ball.vY=this.mySlime.vY + (vYn*Math.cos(-alpha) + vXn*Math.sin(-alpha));

                    this.ball.x=this.mySlime.x-(this.mySlime.radius+this.ball.radius)*Math.cos(theta);
                    this.ball.y=this.mySlime.y + -1*(this.mySlime.radius+this.ball.radius)*Math.sin(theta);

                }
            }
            
        }
    }
    updatePosition(){

        if(this.mySlime.isBallInMyCourt){
            this.detectCollision();
            this.mySlime.updatePosition();
            this.otherSlime.updatePosition();
            this.ball.updatePosition();
            // if()
        }

        


    }

    drawCourt(ctx, elapsed){
        // draw the floor
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(constants.court.canvasWidth,0);
        ctx.strokeStyle = constants.court.floorColor;
        ctx.stroke();

        //draw the net
        ctx.beginPath();
        ctx.moveTo(constants.court.canvasWidth/2,0);
        ctx.lineTo(constants.court.canvasWidth/2,-constants.court.netHeight);
        ctx.strokeStyle = constants.court.netColor;
        ctx.stroke();

    }

    draw(ctx, elapsed){
        // ctx.rotate
        this.drawCourt(ctx, elapsed)

        
        this.mySlime.draw(ctx, elapsed)
        this.otherSlime.draw(ctx, elapsed)
        this.ball.draw(ctx, elapsed)
    }
}