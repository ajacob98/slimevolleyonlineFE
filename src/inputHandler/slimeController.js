import { constants } from "../constants/constants";
import { Keyboard } from "./Keyboard"

export const handleSlimeMovement = (game)=>{
    const slime=game.mySlime;

    if(Keyboard.state.get("ArrowUp")){
		console.log("ARROW UP")
		if(slime.jump==false){
			console.log("JUMP")
			slime.jump=true
			slime.vY=-1*constants.slime.uY;
		}
	}
	if(Keyboard.state.get("ArrowDown")){
		console.log("ARROW Down")
		slime.vY=constants.slime.uY;
	}

	if(Keyboard.state.get("ArrowRight")){
        console.log("ARROW right")
		if(slime.vX<constants.slime.uX){
			slime.vX=constants.slime.uX;
		}
		
		slime.aX = constants.slime.aX;
	}
	else if(Keyboard.state.get("ArrowLeft")){
        console.log("ARROW left")
		if(slime.vX> -1*constants.slime.uX){
			slime.vX= -1*constants.slime.uX;
		}
		slime.aX = -1*constants.slime.aX;
	}
	else{
		slime.aX=0;
	}
}