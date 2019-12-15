var host = window.document.location.host.replace(/:.*/, '');

var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
var room;

const canvas = document.getElementById('pong');

client.joinOrCreate("pong").then(room_instance => {
    room = room_instance;
    var pong = new Pong(canvas);

    room.onStateChange((state) => pong.update(state));

    canvas.addEventListener('mousemove', event => {
        room.send({ type: "move", y: event.pageY });
    });

    canvas.addEventListener('click', event => {
        room.send({ type: "click" })
    });
});


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
    constructor(ball) {
        super(ball.size.x, ball.size.y);
        this.pos = ball.pos;
        this.vel = ball.vel;
    }
}

class Player extends Rect {
    constructor(player) {
        super(player.size.x, player.size.y);
        this.pos = player.pos;
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

    //Update ball position
    update(newState) {
        this.players = newState.players.map(p => new Player(p));
        this.balls = newState.balls.map(b => new Ball(b));
        if (this.players.length > 1)
            console.log(this.players[1].pos);
        this.draw();
    }
}
