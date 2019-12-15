
import { type } from "@colyseus/schema";
import { Rect } from './Rect';

export class Player extends Rect {
    constructor() {
        super(20, 100);
        this.score = 0;
    }

    @type("number") score: number;
}