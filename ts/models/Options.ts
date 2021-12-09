
import { type, Schema } from "@colyseus/schema";

export class Options extends Schema {

    @type("number")
    speedUp: number = 1.1;

    @type("number")
    initialBallSpeed: number = 250;

    @type("string")
    mode: string = "multi-ball | single-ball";

    @type("number")
    pointsToWin: number = 15;

    @type("number")
    paddleWidth: number = 20;

    @type("number")
    paddleHeight: number = 100;
}
