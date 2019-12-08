import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
    @type("number")
    x = Math.floor(Math.random() * 400);

    @type("number")
    y = Math.floor(Math.random() * 400);
}

export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new Player();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    movePlayer (id: string, position: any) {
        if (position.x) {
            this.players[ id ].x = position.x;
        }

        if (position.y) {
            this.players[ id ].y = position.y;
        }
    }
}

export class PongRoom extends Room<State> {
    maxClients = 4;

    onCreate (options: any) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());
    }

    onJoin (client: Client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client: Client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client: Client, data: any) {
        // console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}