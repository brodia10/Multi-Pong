import { Rect } from './Rect';
import { Vec } from './Vec';
import { type } from '@colyseus/schema';

export class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }

    @type(Vec) vel: Vec;

    needToRemove: boolean = false;
}