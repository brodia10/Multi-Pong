import { Room, Client } from "colyseus";
import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { Ball } from "../../models/Ball";
import { number } from "@colyseus/schema/lib/encoding/decode";
import { Vec } from "../../models/Vec";
import { Rect } from "../../models/Rect";
import { Options } from "../../models/Options";


const PLAYER_WIDTH = 20
const PLAYER_HEIGHT = 100

export class Player extends Rect {

    constructor(id: string, playerNumber: number) {
        super(PLAYER_WIDTH, PLAYER_HEIGHT);
        this.id = id;
        this.playerNumber = playerNumber;
        this.score = 0;
    }

    @type("string")
    id: string;

    @type("number")
    playerNumber: number;

    @type("number")
    score: number;

    update(balls: ArraySchema<Ball>, dt: number) {

    }
}


export class ElasticPlayer extends Player {
    constructor(speed = 6.0) {
        super("ai", 0);
        this.speed = speed;
    }

    speed: number;

    update(balls: ArraySchema<Ball>, dt: number) {

        // Computes the distance to closest ball
        let minDistance = 10000000;
        let minDy = 1000000;
        let update = false

        balls.filter(b => b.vel.x < 0).forEach(ball => {
            update = true;
            let dx = ball.pos.x - this.pos.x;
            let dy = ball.pos.y - this.pos.y;
            let r = new Vec(dx, dy);
            let len = r.len;
            if (len < minDistance) {
                minDistance = len;
                minDy = dy;
            }
        });

        if (update)
            this.pos.y += dt * minDy * this.speed;
    }
}

export class PongGame extends Schema {

    constructor(options: Options) {
        super();

        this.options = options;
        this.board = new Vec(1000, 700);
    }

    @type([ Player ])
    players = new ArraySchema<Player>();

    @type([ Ball ])
    balls = new ArraySchema<Ball>();

    @type("number")
    elapsedTime: number = 0;

    @type(Vec)
    board: Vec;

    @type(Options)
    options: Options;

    @type("boolean")
    started: boolean = false;

    addPlayer (id: string) {
        this.players.push(new Player(id, this.players.length + 1));
    }

    removePlayer (id: string) {
        this.players.splice(this.players.findIndex(p => p.id == id), 1);
    }

    getPlayer (id: string) {
        return this.players.find(p => p.id == id);
    }

    get player1 () {
        return this.players.find(player => player.playerNumber == 1);
    }

    get player2 () {
        return this.players.find(player => player.playerNumber == 2);
    }

    movePlayer (id: string, position: any) {
        let player = this.getPlayer(id);
        if (!player)
            return;

        if (position.y && position.y > 0 && position.y < this.board.y) {
            player.pos.y = position.y;
        }
    }

    resetBalls() {
        this.balls = new ArraySchema<Ball>();
    }

    resetPlayers() {
        let player1 = this.player1;
        if (player1) player1.pos.x = 40;

        let player2 = this.player2;
        if (player2) player2.pos.x = this.board.x - 40;

        this.players.forEach(player => {
            player.pos.y = this.board.y / 2;
        })
    }

    start() {
        this.resetBalls();
        this.resetPlayers();
        this.addRandomBall();
        this.started = true;
    }

    update(millis: number) {
        let dt = millis / 1000;

        this.updateBalls(dt);
        this.players.forEach(player => this.collideBalls(player));
        this.players.filter(p => p.id == "ai").forEach(p => p.update(this.balls, dt))
    }

    addRandomBall() {
        let ball = new Ball;
        ball.pos.x = this.board.x / 2;
        ball.pos.y = this.board.y / 2;
        ball.vel.x = Math.random() > .5 ? 1 : -1;
        ball.vel.y = Math.random() * 2 - 1;
        ball.vel.len = this.options.initialBallSpeed;
        let ballIdx = this.balls.push(ball);
        console.log(`Ball ${ballIdx} added`);
    }

    shootBall(playerId: string) {
        let player = this.getPlayer(playerId);
        if (!player) {
            return;
        }

        let delta = 10;

        let ball = new Ball;
        ball.pos.y = (player.top + player.bottom) / 2.0;
        ball.vel.y = 0.1 * this.options.initialBallSpeed*(Math.random() * 2 - 1); // Some random y-velocity

        // Player one is on left (shoot right)
        if (player.playerNumber === 1) {
            ball.vel.x = this.options.initialBallSpeed;
            ball.pos.x = player.right + delta;
        }

        // player two on right (shoot left)
        if (player.playerNumber === 2) {
            ball.vel.x = -this.options.initialBallSpeed;
            ball.pos.x = player.left - delta;
        }

        this.balls.push(ball);
    }

    updateBalls(dt: number) {
        this.balls.forEach(ball => {
            ball.pos.x += ball.vel.x * dt;
            ball.pos.y += ball.vel.y * dt;

            // Bounce of the top and bottom
            if (ball.top < 0 || ball.bottom > this.board.y) {
                ball.vel.y = -ball.vel.y;
            }

            // Score
            if (ball.left < 0) {
                let player2 = this.player2;
                if (player2) player2.score += 1;
                ball.needToRemove = true;
            }

            if (ball.right > this.board.x) {
                let player1 = this.player1;
                if (player1) player1.score += 1;
                ball.needToRemove = true;
            }
        });

        // Remove balls of the game boards
        this.balls = this.balls.filter(ball => !ball.needToRemove);
    }

    collideBalls(player: Player) {
        this.balls.forEach(ball => {
            if (player.left < ball.right && player.right > ball.left &&
                player.top < ball.bottom && player.bottom > ball.top) {

                const len = ball.vel.len;
                ball.vel.x = -ball.vel.x;
                ball.vel.y += 300 * (Math.random() - .5);

                //Increase ball vel on each collision with player
                ball.vel.len = len * this.options.speedUp;
            }
        });
    }
}

export class PongRoom extends Room<PongGame> {
    maxClients = 2;

    onCreate () {
        console.log("Game room created!");

        var options = new Options()
        this.setState(new PongGame(options));
    }

    onJoin (client: Client) {
        console.log("Player joined:", client.sessionId)
        this.state.addPlayer(client.sessionId);

        // Start game if not started
        if (this.state.players.length == 2 && !this.state.started) {
            this.state.start()
            this.setSimulationInterval((dt) => this.state.update(dt));
        }
    }

    onLeave (client: Client) {
        console.log("Player left:", client.sessionId);
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client: Client, data: any) {
        if (!data.type) { // bad message
            console.log("Bad Message Recieved:", data);
            return;
        }
        else if (data.type == "move")
            this.state.movePlayer(client.sessionId, data);
        else if (data.type == "click")
            this.handleClick(client.sessionId);
    }

    private handleClick(playerId: string) {
        if (this.state.started) {
            this.state.shootBall(playerId);
        }
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}