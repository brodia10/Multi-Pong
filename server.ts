import path from 'path';
import http from "http";
import serveIndex from 'serve-index';
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import socialRoutes from "@colyseus/social/express"

import { ChatRoom } from "./ts/GameRooms/ChatRoom";
import { PongRoom } from './ts/GameRooms/Pong/PongRoom';

const port = Number(process.env.PORT || 2567);
const app = express()

app.use(cors());
app.use(express.json())

const gameServer = new Server({
  server: http.createServer(app),
  express: app,
});

// register your room handlers
gameServer.define('chat', ChatRoom);
gameServer.define('pong', PongRoom);

// TODO: This only works if we have DB setup
// register @colyseus/social routes
// app.use("/", socialRoutes);

// For serving the html docs for the rooms
app.use('/', express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))
app.use('/js', express.static(path.join(__dirname, "js")));

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", monitor(gameServer));

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

gameServer.listen(port);

console.log(`Listening on http|ws://localhost:${ port }` )
