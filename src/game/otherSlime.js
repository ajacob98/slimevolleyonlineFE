import { constant } from "lodash";
import { constants } from "../constants/constants";

export class OtherSlime{
    constructor(no){
        this.radius=constants.slime.radius;
        this.x= no==1 ? constants.court.canvasWidth*0.75 : constants.court.canvasWidth*0.25;
        this.y=0;
    }

    updatePosition(elapsed){
        
        
    }

    draw(ctx, elapsed){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI, 0);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}