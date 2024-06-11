import { webSocket } from 'rxjs/webSocket';
import { constants } from '../constants/constants';
import { Config } from '../config/config';

let subject ;

export function sendLostPointMessage(){
    subject.next({ 
        type: 'lostPoint' ,
        data: {
        }
    })
}

export function subscribe(type, roomCode, game) {
    console.log("connecting to be")
    // subject = webSocket("ws://43.205.255.178:8090/connect?type="+type+"&room=1");
    subject = webSocket("ws://"+Config.url+":8090/connect?type="+type+"&room="+roomCode);

    subject.subscribe({
        next: msg => {
            console.log('message received: ' + JSON.stringify(msg, null, 4)) // Called whenever there is a message from the server.
            // msg=JSON.stringify(msg, null, 4);
            console.log("message type: ", msg.type)
            if(msg.type=='slime'){
                msg=msg.data;
                game.otherSlime.x=msg.x
                game.otherSlime.y=msg.y
            }
            else if(game.mySlime.isBallInMyCourt==false && msg.type=='ball'){
                msg=msg.data;
                game.ball.x=msg.x
                game.ball.y=msg.y
                game.ball.vX=msg.vX
                game.ball.vY=msg.vY
                if(game.mySlime.no==2 && (game.ball.x)<=constants.court.canvasWidth/2 && (-game.ball.y+game.ball.radius > constants.court.netHeight)){
                    game.mySlime.isBallInMyCourt=true;
                    game.ball.ballColor="white"
                }
                else if(game.mySlime.no==1 && (game.ball.x)>=constants.court.canvasWidth/2 && (-game.ball.y+game.ball.radius > constants.court.netHeight)){
                    game.mySlime.isBallInMyCourt=true;
                    game.ball.ballColor="yellow"
                }
            }
            else if(msg.type=='resetTo1'){
                console.log("received rest1 message")
                game.mySlime.disable=false;
                game.ball.disable=false;
                if(game.mySlime.no==1){
                    game.mySlime.x = constants.court.canvasWidth*0.75;
                    game.ball.x =constants.court.canvasWidth*0.75;
                    game.ball.y = -(constants.ball.iY);
                    game.ball.vX=0;
                    game.ball.vY=0;
                    game.mySlime.isBallInMyCourt=true;
                }
                else{
                    game.mySlime.isBallInMyCourt=false;
                    game.mySlime.x =constants.court.canvasWidth*0.25;
                }

            }
            else if(msg.type=='resetTo2'){
                console.log("received rest2 message")
                game.mySlime.disable=false;
                game.ball.disable=false;
                if(game.mySlime.no==2){
                    game.mySlime.x = constants.court.canvasWidth*0.25;
                    game.ball.x =constants.court.canvasWidth*0.25;
                    game.ball.y = -(constants.ball.iY);
                    game.ball.vX=0;
                    game.ball.vY=0;
                    game.mySlime.isBallInMyCourt=true;
                }
                else{
                    game.mySlime.isBallInMyCourt=false;
                    game.mySlime.x =constants.court.canvasWidth*0.75;
                }

            }
            else if(msg.type=='score'){
                // msg=msg.data;
                game.score1=msg.score1;
                game.score2=msg.score2;
            }
        },
        error: err => console.log("error here\n",err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
    console.log("TYPE!!!!!!!!!!", type)
    if(type=="host"){
        console.log("HOST!!!!!!!!!!!!!!!!!")
        subject.next({
            type: 'initialize',
            data: {
                ballRadius: constants.ball.radius,
                slimeRadius: constants.slime.radius,
                floorWidth: constants.court.canvasWidth,
            },
        })
    }
    

    setInterval(()=>{
        console.log("Sending slime data")
        subject.next({ 
            type: 'slime' ,
            data: {
                x: game.mySlime.x,
                y: game.mySlime.y,
            }
        })

        if(game.mySlime.isBallInMyCourt){
            console.log("Sending Ball data")
            subject.next({ 
                type: 'ball' ,
                data: {
                    x: game.ball.x,
                    y: game.ball.y,
                    vX: game.ball.vX,
                    vY: game.ball.vY,
                }
            })
            if(game.mySlime.no==2 && (game.ball.x)>constants.court.canvasWidth/2 && (-game.ball.y+game.ball.radius > constants.court.netHeight)){
                game.mySlime.isBallInMyCourt=false;
                game.ball.ballColor="yellow"
            }
            else if(game.mySlime.no==1 && (game.ball.x)<constants.court.canvasWidth/2 && (-game.ball.y+game.ball.radius > constants.court.netHeight)){
                game.mySlime.isBallInMyCourt=false;
                game.ball.ballColor="white"
            }
        }
    },20);

}

