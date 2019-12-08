var host = window.document.location.host.replace(/:.*/, '');

var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));
var room;

const canvas = document.getElementById('pong');

client.joinOrCreate("pong").then(room_instance => {
    room = room_instance;

    var players = {};
    var colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta'];

    // listen to patches coming from the server
    room.state.players.onAdd = function (player, sessionId) {
        var dom = document.createElement("div");
        dom.className = "player";
        dom.style.left = player.x + "px";
        dom.style.top = player.y + "px";
        dom.style.background = colors[Math.floor(Math.random() * colors.length)];
        dom.innerHTML = "Player " + sessionId;

        players[sessionId] = dom;
        document.body.appendChild(dom);
    }

    room.state.players.onRemove = function (player, sessionId) {
        document.body.removeChild(players[sessionId]);
        delete players[sessionId];
    }

    room.state.players.onChange = function (player, sessionId) {
        var dom = players[sessionId];
        dom.style.left = player.x + "px";
        dom.style.top = player.y + "px";
    }

    //Make mouse control player 1 movement
    canvas.addEventListener('mousemove', event => {
        room.send({
            x: event.pageX,
            y: event.pageY
        });
    });
});