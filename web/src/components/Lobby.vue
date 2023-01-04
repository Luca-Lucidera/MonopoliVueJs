<template>
  <div>Il tuo username è {{ userStorage.getUsername.value }}</div>
  <br />
  <div>
    L'Owner della lobby
    {{ owner == userStorage.getUsername.value ? "sei tu!" : `è ${owner}` }}
  </div>
  <div>
    <div v-for="(playerName, index) in playerList" :key="index">
      <p>{{ playerName }}</p>
    </div>
    <button v-show="owner == userStorage.getUsername.value" :disabled="playerList.length < 2" @click="socket.emit('game-start', userStorage.getLobbyId.value)">
      Inizia la partita!
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/index";
import { ref } from "vue";
import { useRouter } from "vue-router";

//STORAGE
const userStorage = useUserStore();
const socket = userStorage.getUserSocket;
console.log(userStorage.getLobbyId)
//REF
const playerList = ref([]);
const owner = ref("");
const router = useRouter();

//SOCKET EVENT
socket.on("update-lobby", (listPlayerInLobby, lobbyOwner) => {
  playerList.value = [...listPlayerInLobby];
  owner.value = lobbyOwner;
});

socket.on('pedina', (pedina) => {
  userStorage.pedina = pedina
  router.push('/game')
})
</script>
