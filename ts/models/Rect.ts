import { type, Schema } from "@colyseus/schema";
import { Vec } from './Vec';

export class Rect extends Schema {
    constructor(w: number, h: number) {
        super();
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }

    @type(Vec) pos: Vec;
    @type(Vec) size: Vec;

    get left() {
        return this.pos.x - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x / 2;
    }

    get top() {
        return this.pos.y - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}