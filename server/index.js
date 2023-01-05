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
const pedine = ["🚙", "☕", "🧲", "🎩"];

let lobby = [];

io.on("connection", (socket) => {
  socket.on("crea-lobby", (username) => {
    if (!username) socket.emit("username-vuoto");
    else {
      socket.data.username = username;
      socket.data.lobby_owner = username;
      const lobbyId = lobbyNameString + username;
      socket.join(lobbyId);
      lobby.push({
        id: lobbyId,
        turno: 1,
      });
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
          s.data.posizione = 1;
          s.data.turno = i + 1;
          s.emit("pedina", pedina);
        }
      } catch (error) {
        console.log("errore", error);
      }
    }
  });

  socket.on("game-info", async (lobbyId) => {
    if (!lobbyId) socket.emit("lobbyId-vuoto", "errore: lobbyId vuoto!");
    else {
      let gameInfo = [];
      try {
        const sockets = await io.in(lobbyId).fetchSockets();
        let currentGameRound = -1;
        lobby.forEach((game) => {
          if (game.id == lobbyId) {
            currentGameRound = game.turno;
          }
        });
        sockets.forEach((s) => {
          const urTurn = currentGameRound == s.data.turno;
          gameInfo.push({
            username: s.data.username,
            pedina: s.data.pedina,
            posizione: s.data.posizione,
            yourTurn: urTurn,
          });
        });
        io.in(lobbyId).emit("game-update", gameInfo);
      } catch (error) {
        console.error(error);
      }
    }
  });

  socket.on("tira-dadi", async (lobbyId) => {
    console.log('--------')
    console.log('USERNAME',socket.data.username, 'POSIZIONE ATTUALE', socket.data.posizione);
    const dado1 = Math.floor(Math.random() * 6) + 1; //ESTRAE UN NUMERO TRA 1 E 6
    console.log("DADO1", dado1)
    const dado2 = Math.floor(Math.random() * 6) + 1; //ESTRAE UN NUMERO TRA 1 E 6
    console.log("DADO2", dado2)
    const sumDadi = dado1 + dado2;
    console.log('SOMMA', sumDadi)
    const nextPos = socket.data.posizione + sumDadi;
    console.log('PROSSIMA PREVISTA', nextPos)
    if(nextPos <= 39){
      socket.data.posizione += sumDadi;
    } else {
      socket.data.posizione = 1 + (nextPos - 39);
    }
    console.log('POSIZIONE REALE DOPO SOMMA', socket.data.posizione)
    console.log('--------')
    try {
      const sockets = await io.in(lobbyId).fetchSockets();
      const nPlayer = sockets.length;
      let currentGameRound = -1;
      lobby.forEach((game) => {
        if(game.id == lobbyId){
          if(game.turno == nPlayer) {
            game.turno = 1;
          } else {
            game.turno++;
          }
          currentGameRound = game.turno;
        }
      });
      let gameInfo = [];
      sockets.forEach((s) => {
        const urTurn = currentGameRound == s.data.turno;
        gameInfo.push({
          username: s.data.username,
          pedina: s.data.pedina,
          posizione: s.data.posizione,
          yourTurn: urTurn,
        });
      });
      io.in(lobbyId).emit("game-update", gameInfo);
    } catch (error) {
      console.log(error)
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
