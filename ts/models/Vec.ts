import { Schema, type } from "@colyseus/schema";

export class Vec extends Schema {
    constructor(x = 0, y = 0) {
        super();
        this.x = x;
        this.y = y;
    }

    @type("number") x: number;
    @type("number") y: number;

    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}
