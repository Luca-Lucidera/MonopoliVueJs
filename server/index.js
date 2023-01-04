const { tabellone, tabelloneOrdinato } = require("./tabellone");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const lobbyNameString = "lobby-di-";
const pedine = ["cariola", "cestino", "ferro", "cappello"];


io.on("connection", (socket) => {
  socket.on("crea-lobby", (username) => {
    if (!username) socket.emit("username-vuoto");
    else {
      socket.data.username = username;
      socket.data.lobby_owner = username;
      const lobbyId = lobbyNameString + username;
      socket.join(lobbyId);
      socket.emit("lobby-creata");
    }
  });

  socket.on("join-lobby", async (username, lobbyId) => {
    if (!username) socket.emit("username-vuoto");
    else {
      socket.data.username = username;
      socket.join(lobbyId);
      socket.emit("joined");
      try {
        const listSocket = await io.in(lobbyId).fetchSockets();
        const playerInLobby = [];
        let owner;
        listSocket.forEach((sock) => {
          playerInLobby.push(sock.data.username);
          if (sock.data.lobby_owner) owner = sock.data.lobby_owner;
        });
        io.in(lobbyId).emit("update-lobby", playerInLobby, owner);
      } catch (error) {
        console.error("error", error);
      }
    }
  });

  socket.on("game-start", async (lobbyId) => {
    if (!lobbyId || lobbyId.indexOf("lobby-di-") != 0)
      socket.emit(
        "errore-nome-lobby",
        "Il nome non è presente o non segue lo standard"
      );
    else {
      try {
        const sockets = await io.in(lobbyId).fetchSockets();
        for (let i = 0; i < sockets.length; i++) {
          const s = sockets.at(i);
          let pedina = pedine.at(i);
          s.data.pedina = pedina;
          s.emit("pedina", pedina);
        }
      } catch (error) {
        console.log("errore", error);
      }
    }
  });
});

app.get("/lobby", (req, res) => {
  const allKeys = [...io.sockets.adapter.rooms.keys()];
  const lobby = allKeys.filter((key) => key.indexOf("lobby-di-") == 0);
  res.status(200).json(lobby);
});

app.get("/tabellone", (req, res) => {
  res.status(200).json({ tabellone, tabelloneOrdinato });
});

httpServer.listen(3000, () => {
  console.log("http://localhost:3000/");
});
