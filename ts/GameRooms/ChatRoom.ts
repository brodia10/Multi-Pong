import { Room, Client } from "colyseus";
import { Schema, MapSchema, type } from "@colyseus/schema";


class Player extends Schema {
  constructor() {
    super();
    this.x = 0;
    this.y = 0;
  }

  @type("number") x: number;
  @type("number") y: number;
}

class State extends Schema {
  constructor() {
    super();
    this.players = new MapSchema();
  }

  @type({ map: Player }) players: MapSchema;
}

export class ChatRoom extends Room {

  onCreate (options: any) {
    this.setState(new State());

    this.onMessage("message", (client, data) => {
      console.log("Message received:", data);
      this.broadcast("message", `[${ client.sessionId } ${(new Date().toLocaleTimeString())}] ${ data.message }`);
    });

    console.log("Chat room created");
  }

  onJoin (client: Client, options: any) {
    this.state.players[client.sessionId] = new Player();
    console.log("Player joined:", client.sessionId);
  }

  onLeave (client: Client, consented: boolean) {
    delete this.state.players[client.sessionId];
    console.log("Player left:", client.sessionId);
  }

  onDispose() {
    console.log("Chat room disposed");
  }

}
