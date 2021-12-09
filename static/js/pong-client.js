var host = window.document.location.host.replace(/:.*/, '');

var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
var room;

const canvas = document.getElementById('pong');

client.joinOrCreate("pong").then(room_instance => {
    room = room_instance;
    var pong = new Pong(canvas);

    room.onStateChange((state) => pong.update(state));

    canvas.addEventListener('mousemove', event => {
        // Send normalized Y-position
        room.send("move", { y: event.pageY / window.innerHeight });
    });

    canvas.addEventListener('click', event => {
        room.send("click");
    });

    // Re-draw game if window is resized.
    window.addEventListener('resize', () => pong.draw(), false);
});


//Create reusable vector
class Vec {
    constructor(x = 0, y = 0) {
        this.x = Number(x);
        this.y = Number(y);
    }
    get len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }

    scale(x, y) {
        this.x *= x;
        this.y *= y;
        return this;
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

    scale(x, y) {
        this.pos.scale(x, y);
        this.size.scale(x, y);
        return this;
    }
}
//Create ball
class Ball extends Rect {
    constructor(ball) {
        super(ball.size.x, ball.size.y);
        this.pos = new Vec(ball.pos.x, ball.pos.y);
        this.vel = new Vec(ball.vel.x, ball.vel.y);
    }

    scale(x, y) {
        this.pos.scale(x, y);
        this.vel.scale(x, y);
        this.size.scale(x, y);
        return this;
    }
}

class Player extends Rect {
    constructor(player) {
        super(player.size.x, player.size.y);
        this.pos = new Vec(player.pos.x, player.pos.y);
        this.score = player.score;
    }
}

class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        //Create players
        this.players = [];
        this.balls = [];

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
    }

    draw() {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;

        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.balls.forEach(ball => this.drawRect(ball));
        this.players.forEach(player => this.drawRect(player));
        this.drawScore();
    }

    drawRect(rect) {
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }

    drawScore() {
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

    // Update ball and player positions
    update(newState = null) {
        // Scale factors to convert server positions to local
        // client positions depend on window dimenions and the
        // actual game board size.
        const xfactor = window.innerWidth / newState.board.x;
        const yfactor = window.innerHeight / newState.board.y;

        // Convert to local (scaled) players and balls
        this.players = newState.players.map(p => (new Player(p)).scale(xfactor, yfactor));
        this.balls = newState.balls.map(b => (new Ball(b)).scale(xfactor, yfactor));
        // if (this.players.length > 1)
            // console.log(this.players[1].pos);
        this.draw();
    }
}
