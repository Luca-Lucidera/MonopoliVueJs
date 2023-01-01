const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const cors = require('cors')

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: cors({
        allowedHeaders: "*",
        origin: true
    })
});

io.on("connection", (socket) => {
    socket.on("crea-lobby", (username) => {
        socket.join(`lobby-di-${username}`);
        io.emit("lobby-creata")
    })
});

httpServer.listen(3000);