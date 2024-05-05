import { webSocket } from 'rxjs/webSocket';


export function subscribe(type, game) {
    console.log("connecting to be")
    const subject = webSocket("ws://localhost:8090/connect?type="+type+"&room=1");

    subject.subscribe({
        next: msg => {
            console.log('message received: ' + JSON.stringify(msg, null, 4)) // Called whenever there is a message from the server.
            // msg=JSON.stringify(msg, null, 4);
            console.log("message type: ", msg.type)
            if(msg.type=='slime'){
                console.log("updating otherslime")
                game.otherSlime.x=msg.x
                game.otherSlime.y=msg.y
            }
        },
        error: err => console.log("error here\n",err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });

    setInterval(()=>{
        console.log("Sengind alan")
        subject.next({ 
            type: 'slime' ,
            x: game.mySlime.x,
            y: game.mySlime.y,
            vX: game.mySlime.vX,
            vY: game.mySlime.vY,
        })
    },10);
}

