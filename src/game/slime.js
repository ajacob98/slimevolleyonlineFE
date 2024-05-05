import { constant } from "lodash";
import { constants } from "../constants/constants";

export class Slime{
    constructor(no){
        this.radius=constants.slime.radius;
        this.x= no==1 ? constants.court.canvasWidth*0.75 : constants.court.canvasWidth*0.25;
        this.y=0;
        this.vX=0;
        this.vY=0;
        this.aX=0;
        this.aY=constants.slime.gravity;
        this.jump=false;
        this.isBallInMyCourt=true;
    }

    updatePosition(elapsed){
        const t=0.5;
        const t2=0.25;

        if(this.aX==0){
            this.vX=this.vX>0 ? Math.floor(this.vX/1.1) : Math.ceil(this.vX/1.1);
        }
        this.x=this.x +  (this.vX * t + 0.5*this.aX*t2);
        this.vX=this.vX+ this.aX*t;


        if(this.jump==true){
            this.y=this.y + (this.vY*t + 0.5*this.aY*t2);
            this.vY=this.vY+this.aY*t;
            if(this.y>=0){
                this.jump=false;
                this.vY=0;
                this.y=0;
            }
        }
        
    }

    draw(ctx, elapsed){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}