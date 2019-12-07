//Create reusable vector
class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }
}
//Create rectangle
class Rect {
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
    }
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
//Create ball
class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
        this.needToRemove = false;
    }

}

class Player extends Rect {
    constructor() {
        super(20, 100);
        this.score = 0;
    }
}

class UnbeatablePlayer extends Player {
    constructor() {
        super();
        this.size = new Vec(20, 20);
    }

    update(balls, dt) {
        let maxBallY = 0;
        let maxBallX = -1;
        balls.forEach(ball => {
            if (ball.pos.x > maxBallX) {
                maxBallY = ball.pos.y;
                maxBallX = ball.pos.x;
            }
        });
        this.pos.y = maxBallY;
    }
}

class ElasticPlayer extends Player {
    constructor(speed = 1.0) {
        super();
        this.speed = speed;
    }

    update(balls, dt) {

        // Computes the distance to closest ball
        let minDistance = 10000000;
        let minDy = 1000000;

        balls.forEach(ball => {
            let dx = ball.pos.x - this.pos.x;
            let dy = ball.pos.y - this.pos.y;
            let r = new Vec(dx, dy);
            let len = r.len;
            if (len < minDistance) {
                minDistance = len;
                minDy = dy;
            }
        });

        this.pos.y += dt * minDy * this.speed;
    }
}

class Pong {
    constructor(canvas, aiPlayer, speedUp = 1.05) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        // start with 1 ball
        this.balls = [new Ball];
        this.speedUp = speedUp;
        this.started = false;

        //Create players
        this.players = [
            new Player,
            aiPlayer,
        ];

        //Player starting position
        this.players[0].pos.x = 40;
        this.players[1].pos.x = this._canvas.width - 40;
        this.players.forEach(player => {
            player.pos.y = this._canvas.height / 2;
        })
        //Animate ball by finding where it was in the last frame
        let lastTime;
        this.elapsedTime = 0;

        const callback = (millis) => {
            if (lastTime) {
                this.update((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        };
        callback();

        //Create score graphics iterate each string which creates a new canvas and for each canvas we draw new pixels
        this.CHAR_PIXEL = 10;
        this.CHARS = [
            '111101101101111',
            '010010010010010',
            '111001111100111',
            '111001111001111',
            '101101111001001',
            '111100111001111',
            '111100111101111',
            '111001001001001',
            '111101111101111',
            '111101111001111',
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.height = this.CHAR_PIXEL * 5;
            canvas.width = this.CHAR_PIXEL * 3;
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            str.split('').forEach((fill, i) => {
                if (fill === '1') {
                    context.fillRect(
                        (i % 3) * this.CHAR_PIXEL,
                        (i / 3 | 0) * this.CHAR_PIXEL,
                        this.CHAR_PIXEL,
                        this.CHAR_PIXEL);

                }
            });
            return canvas;
        });

        this.reset();
        this.start();
    }
    //Collide player with ball
    collide(player, ball) {
        // console.log("collid");

        if (player.left < ball.right && player.right > ball.left &&
            player.top < ball.bottom && player.bottom > ball.top) {

            const len = ball.vel.len;
            ball.vel.x = -ball.vel.x;
            ball.vel.y += 300 * (Math.random() - .5);

            //Increase ball vel on each collision with player
            ball.vel.len = len * this.speedUp;
        }
    }
    //Reset ball position after either player scores
    reset() {
        // The initial condition
        this.elapsedTime = 0;
        this.balls = [new Ball];

        //New this.ball Position
        this.balls[0].pos.x = this._canvas.width / 2;
        this.balls[0].pos.y = this._canvas.height / 2;

        //New this.ball velocity
        this.balls[0].vel.x = 0;
        this.balls[0].vel.y = 0;
    }

    //Checks ball speed to restart a new serve after scoring 
    start() {

        this.balls.forEach(ball => {
            if (ball.vel.x === 0 && ball.vel.y === 0) {
                ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
                ball.vel.y = 300 * (Math.random() * 2 - 1);
                ball.vel.len = 200;
            }
        });

        this.started = true;
    }

    //Draw new object
    draw() {
        // console.log("draw");
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        // this.drawRect(this.ball);
        this.balls.forEach(ball => this.drawRect(ball));

        this.players.forEach(player => this.drawRect(player));
        this.drawScore();
    }

    drawRect(rect) {
        // console.log("drawRect");
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    addBall() {
        let ball = new Ball;
        ball.pos.x = this._canvas.width / 2;
        ball.pos.y = this._canvas.height / 2;
        ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
        ball.vel.y = 300 * (Math.random() * 2 - 1);
        ball.vel.len = 200;
        this.balls.push(ball);
    }

    drawScore() {
        // console.log("drawScore");
        const align = this._canvas.width / 3;
        const CHAR_W = this.CHAR_PIXEL * 4;
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split('');
            const offset = align *
                (index + 1) -
                (CHAR_W * chars.length / 2) +
                this.CHAR_PIXEL / 2;
            chars.forEach((char, pos) => {
                this._context.drawImage(this.CHARS[char | 0], offset + pos * CHAR_W, 20);
            });
        });
    }

    //Update ball position
    update(dt) {

        this.elapsedTime += dt;

        // Move the ball
        this.balls.forEach(ball => {

            ball.pos.x += ball.vel.x * dt;
            ball.pos.y += ball.vel.y * dt;

            //Create bounce off of the canvas and set score
            if (ball.left < 0 || ball.right > this._canvas.width) {
                const playerId = ball.vel.x < 0 | 0;
                this.players[playerId].score++;

                // this.reset();
                ball.needToRemove = true;
            }

            if (ball.top < 0 || ball.bottom > this._canvas.height) {
                // console.log("hit top or bottom");
                ball.vel.y = -ball.vel.y;
            }
        });

        // Remove balls
        this.balls = this.balls.filter(ball => !ball.needToRemove);

        // Stop the game if there's not balls left
        if (this.balls.length == 0)
            this.reset();

        // Collide balls with player paddles
        // this.players[0].update(this.balls, dt); // only if both players are AIs
        this.players[1].update(this.balls, dt);

        this.players.forEach(player => this.balls.forEach(ball => this.collide(player, ball)));
        this.draw();
    }
}
const canvas = document.getElementById('pong');


const ai = new ElasticPlayer(10.0);
const pong = new Pong(canvas, ai, 1.1);

//Make mouse control player 1 movement
canvas.addEventListener('mousemove', event => {
    const scale = event.offsetY / event.target.getBoundingClientRect().height;
    pong.players[0].pos.y = canvas.height * scale;
});
//Initialize start()
canvas.addEventListener('click', event => {
    if (pong.started)
        pong.addBall();
    else
        pong.start();
});