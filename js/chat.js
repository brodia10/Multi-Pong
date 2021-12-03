var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + "//" + host + (location.port ? ':' + location.port : ''));

client.joinOrCreate("chat").then(room => {
    console.log("joined");

    room.onStateChange.once(function (state) {
        console.log("initial room state:", state);
    });

    // new room state
    room.onStateChange(function (state) {
        // this signal is triggered on each patch
    });

    // listen to patches coming from the server
    room.onMessage(function (message) {
        var m = document.createElement("div");
        m.innerHTML = message;
        m.classList = "message";
        document.querySelector("#messages").appendChild(m);
    });

    // send message to room on submit
    document.querySelector("#form").onsubmit = function (e) {
        e.preventDefault();
        var input = document.querySelector("#input");
        console.log("input:", input.value);
        // send data to room
        room.send({ message: input.value });
        // clear input
        input.value = "";
    }
});