/*
* Routing for our application
*/

import path from 'path';
import express from "express";

const router = express.Router();

// For serving the html docs for the rooms
router.use('/static', express.static(path.join(__dirname, "static")));

router.get("/", function (req, res) {
  res.render("index", {
    title: "Multi-Pong | Home",
    // TODO: Inject data about current game rooms...
  });
});

router.get("/single-player", function (req, res) {
  res.render("single", {
    title: "Multi-Pong | Single-Player",
  });
});

router.get("/play", function (req, res) {
  res.render("multiplayer", {
    title: "Multi-Pong | Multiplayer",
  });
});

router.get("/chat", function (req, res) {
  res.render("chat", {
    title: "Multi-Pong | Chat",
    welcomeMessage: "Talk about how excited you are for this to be here!",
  });
});

export default router;