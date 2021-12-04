import path from 'path';
import http from "http";
import serveIndex from 'serve-index';
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import  basicAuth  from "express-basic-auth";

import { ChatRoom } from "./ts/GameRooms/ChatRoom";
import { PongRoom } from './ts/GameRooms/Pong/PongRoom';

// Load environment
const PORT = Number(process.env.PORT || 2567)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'

// Create express app + middleware
const app = express()
app.use(cors());
app.use(express.json())

// Configure Colyseus game server
const gameServer = new Server({
  server: http.createServer(app),
  express: app,
});

// Register your Colyseus room handlers
gameServer.define('chat', ChatRoom);
gameServer.define('pong', PongRoom);

// For serving the html docs for the rooms
app.use('/', express.static(path.join(__dirname, "static")));
app.use('/', serveIndex(path.join(__dirname, "static"), {'icons': true}))
app.use('/js', express.static(path.join(__dirname, "js")));


// Basic auth protected colyseus monitor (must be AFTER registering your room handlers)
app.use(
  "/colyseus",
  basicAuth({ users: { 'admin': ADMIN_PASSWORD }, challenge: true, realm: "multi-pong-server" }),
  monitor(gameServer)
);

gameServer.onShutdown(function(){
  console.log(`game server is going down.`);
});

// Run the game server async in background
gameServer.listen(PORT);

console.log(`Listening on http|ws://localhost:${ PORT }` )
