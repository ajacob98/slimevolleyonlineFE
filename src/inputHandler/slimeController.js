import { constants } from "../constants/constants";
import { Keyboard } from "./Keyboard"

export const handleSlimeMovement = (game)=>{
    const slime=game.mySlime;

    if(Keyboard.state.get("ArrowUp")){
		if(slime.jump==false){
			slime.jump=true
			slime.vY=-1*constants.slime.uY;
		}
	}
	if(Keyboard.state.get("ArrowDown")){
		slime.vY=constants.slime.uY;
	}

	if(Keyboard.state.get("ArrowRight")){
		if(slime.vX<constants.slime.uX){
			slime.vX=constants.slime.uX;
		}
		
		slime.aX = constants.slime.aX;
	}
	else if(Keyboard.state.get("ArrowLeft")){
		if(slime.vX> -1*constants.slime.uX){
			slime.vX= -1*constants.slime.uX;
		}
		slime.aX = -1*constants.slime.aX;
	}
	else{
		slime.aX=0;
	}
}