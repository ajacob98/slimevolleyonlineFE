import { webSocket } from 'rxjs/webSocket';


export function subscribe() {
    const subject = webSocket('ws://localhost:8090/connect');

    subject.subscribe({
        next: msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
        error: err => console.log("error here\n",err), // Called if at any point WebSocket API signals some kind of error.
        complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
}

