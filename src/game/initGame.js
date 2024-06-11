import Icon from '../icon.png';
import { webSocket } from 'rxjs/webSocket';
import {subscribe} from '../service/wsEvents'
import {constants} from '../constants/constants'
import {Game} from './game'
import { handleSlimeMovement } from '../inputHandler/slimeController';
import { Keyboard } from '../inputHandler/Keyboard';
import { Config } from '../config/config';

export const initGame = (type, roomCode, mySlimeNo, otherSlimeNo)=>{
    console.log("load.......")
    

    Keyboard.initialize()
    Config.initialize()
    const game=new Game(mySlimeNo, otherSlimeNo);

    subscribe(type, roomCode, game);

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
        

        ctx.clearRect(0, -(constants.court.gameHeight), constants.court.canvasWidth, constants.court.canvasHeight); // clear canvas


        handleSlimeMovement(game);
        
        game.updatePosition();
        game.draw(ctx, elapsed);

        // window.requestAnimationFrame(draw);
    }
    // window.requestAnimationFrame(draw);
    setInterval(draw, 28); 
}