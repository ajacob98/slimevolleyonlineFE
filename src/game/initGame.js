import Icon from '../icon.png';
import { webSocket } from 'rxjs/webSocket';
import {subscribe} from '../service/wsEvents'
import {constants} from '../constants/constants'
import {Game} from './game'
import { handleSlimeMovement } from '../inputHandler/slimeController';
import { Keyboard } from '../inputHandler/Keyboard';

export const initGame = (type, mySlimeNo, otherSlimeNo)=>{
    console.log("load.......")
    

    Keyboard.initialize()
    const game=new Game(mySlimeNo, otherSlimeNo);

    subscribe(type, game);

    var canvas = document.getElementById("canvas");
    canvas.height=constants.court.canvasHeight;
    canvas.width=constants.court.canvasWidth;
    canvas.style.backgroundColor=constants.court.canvasBackgroundColor;
    canvas.style.border=constants.court.canvasBorder;
    canvas.style.borderColor=constants.court.canvasBorderColor;

    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.translate(0, constants.court.gameHeight);
    ctx.globalCompositeOperation = "destination-over";

    var start = Date.now()

    const draw = () => {
        var currentTime=Date.now();
        var elapsed=currentTime-start;
        start=currentTime;
        
        
        ctx.beginPath();
        ctx.moveTo(0, -(constants.court.canvasHeight-100));
        ctx.lineTo(constants.court.canvasWidth,100);
        ctx.strokeStyle = constants.court.floorColor;
        ctx.stroke();
        ctx.clearRect(0, -(constants.court.canvasHeight-100), constants.court.canvasWidth, constants.court.canvasHeight); // clear canvas


        handleSlimeMovement(game);
        
        game.updatePosition();
        game.draw(ctx, elapsed);

        // console.log(elapsed)
        window.requestAnimationFrame(draw);
        // setTimeout(draw, 250);
    }
    window.requestAnimationFrame(draw);
}