const express = require("express");
const shortid = require("shortid");
const cors = require("cors");
const helmet = require("helmet");

// Middleware:

// Routers:
const userRouter = require('./routes/user');
const imageRouter = require('./routes/image');

const server = express();

server.use(helmet());
server.use(
    cors({
      origin: '*',
    })
  );

server.use('/api/user', userRouter);
server.use('/api/image', imageRouter);

server.get("/api", (req, res) => {
  const message = process.env.MESSAGE || "'/' root endpoint is up.";
  res.status(200).json({ api: "up", message });
});

server.get("/", (req, res) => {
  const message = process.env.MESSAGE || "'/' endpoint is up.";
  res.status(200).json({ api: "up", message });
});

module.exports = server;
