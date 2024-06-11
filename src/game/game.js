import {Slime} from './slime';
import {OtherSlime} from './otherSlime';
import {Ball} from './ball';
import { constants } from '../constants/constants';
import { sendLostPointMessage } from '../service/wsEvents';

export class Game{
    constructor(mySlimeNo, otherSlimeNo){
        this.mySlime=new Slime(mySlimeNo);
        this.otherSlime=new OtherSlime(otherSlimeNo);
        this.ball=new Ball();
        this.score1=0;
        this.score2=0;
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

                    
                    let vXn=(this.ball.vX-this.mySlime.vX)*Math.cos(alpha) + (this.ball.vY-this.mySlime.vY)*Math.sin(alpha);
                    let vYn=(this.ball.vY-this.mySlime.vY)*Math.cos(alpha) - (this.ball.vX-this.mySlime.vX)*Math.sin(alpha);
                    vYn=-1*vYn;

                    this.ball.vX=this.mySlime.vX + (vXn*Math.cos(-alpha) + vYn*Math.sin(-alpha));
                    this.ball.vY=this.mySlime.vY + (vYn*Math.cos(-alpha) - vXn*Math.sin(-alpha));


                    this.ball.x=this.mySlime.x+(this.mySlime.radius+this.ball.radius)*Math.cos(theta);
                    this.ball.y=this.mySlime.y + -1*(this.mySlime.radius+this.ball.radius)*Math.sin(theta);

                }
                else{
                    const theta=Math.atan((this.ball.y-this.mySlime.y)/(this.ball.x-this.mySlime.x));
                    const alpha=Math.PI/2-theta;

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

    ballTouchedGround(){
        if(-(this.ball.y+2) <= this.ball.radius)
            return true
        return false;
    }
    updatePosition(){

        if(this.mySlime.disable==false && this.mySlime.isBallInMyCourt){
            this.detectCollision();
            this.ball.updatePosition();
            if(this.ballTouchedGround()){
                sendLostPointMessage();
                console.log("LOST POINT")
                this.mySlime.disable=true;
                this.ball.disable=true;
                this.ball.y=-this.ball.radius-2
            }
            
        }
        this.mySlime.updatePosition();
        this.otherSlime.updatePosition();
        
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

        //draw score
        ctx.font = "20px Arial, sans-serif";
        ctx.fillStyle="white"
        ctx.fillText("Score: "+this.score2+" / "+this.score1, constants.court.canvasWidth-150,-(constants.court.gameHeight-50));

    }

    draw(ctx, elapsed){
        // ctx.rotate
        this.drawCourt(ctx, elapsed)

        
        this.mySlime.draw(ctx, elapsed)
        this.otherSlime.draw(ctx, elapsed)
        this.ball.draw(ctx, elapsed)
    }
}