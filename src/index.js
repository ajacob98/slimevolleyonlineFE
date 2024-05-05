import _ from 'lodash';
import './style.css';
import { initGame } from './game/initGame';
import { subscribe } from './service/wsEvents';


window.addEventListener('load', ()=>{
    if(document.readyState == 'complete'){

        

        let mySlimeNo=1; //right
        let otherSlimeNo=2; //left

        const gamePage=document.getElementById("game");

        const hostButton=document.getElementById("host");
        hostButton.onclick= ()=>{
            initGame("host", mySlimeNo, otherSlimeNo)
        }

        const joinButton=document.getElementById("join");
        joinButton.onclick=()=>{
            mySlimeNo=2;
            otherSlimeNo=1;
            initGame("join", mySlimeNo, otherSlimeNo)
        }

        
    
    }   
})
