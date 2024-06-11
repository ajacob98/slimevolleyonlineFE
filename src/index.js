import _ from 'lodash';
import './style.css';
import { initGame } from './game/initGame';


window.addEventListener('load', ()=>{
    if(document.readyState == 'complete'){
        let mySlimeNo=1; //right
        let otherSlimeNo=2; //left
        let roomCode="";

        const roomCodeInput=document.getElementById("room-no");
        roomCodeInput.onchange=(e)=>{
            roomCode=e.target.value;
        }

        const hostButton=document.getElementById("host");
        hostButton.onclick= ()=>{
            if(roomCode==null || roomCode.trim()=="")
                alert("invalid room code")
            else
                initGame("host", roomCode, mySlimeNo, otherSlimeNo)
        }

        const joinButton=document.getElementById("join");
        joinButton.onclick=()=>{
            mySlimeNo=2;
            otherSlimeNo=1;
            if(roomCode==null || roomCode.trim()=="")
                alert("invalid room code")
            else
                initGame("join", roomCode, mySlimeNo, otherSlimeNo)
        }

        
    
    }   
})
