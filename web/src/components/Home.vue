<template>
  <h1>Monopoly!</h1>
  <div v-if="!usernameSaved">
    <label for="username">Username: </label>
    <input type="text" id="username" v-model="username" />
    <br />
    <span :style="{ visibility: visibility }">Username non valido, min 3 caratteri, max 20, accettati solo - _</span>
    <br />
    <input type="submit" value="Salva" :disabled="btnDisable" @click.prevent="saveUsername" />
  </div>
  <div v-else>
    <button @click="socket.emit('crea-lobby', userStorage.getUsername.value)">
      Crea una lobby
    </button>
    <button @click="router.push('/search')">Partecipa a una lobby</button>
  </div>
</template>

<script setup>
//IMPORT
import { ref, watch } from "vue";
import { useUserStore } from "../store/index";
import { useRouter } from "vue-router";
//STATE
const username = ref("");
const visibility = ref("hidden");
const btnDisable = ref(true);
const usernameSaved = ref(false);
const router = useRouter();

//STORE
const userStorage = useUserStore();
const socket = userStorage.getUserSocket

//WATCHER
watch(username, (newUsername) => {
  const regex = /^[a-zA-Z0-9 _\-]{3,20}$/;
  if (!regex.test(newUsername)) {
    visibility.value = "visible";
    btnDisable.value = true;
  } else {
    visibility.value = "hidden";
    btnDisable.value = false;
  }
});

//FUNCTION
const saveUsername = () => {
  userStorage.username = username.value;
  usernameSaved.value = true;
};

//SOCKET EVENT
socket.on("lobby-creata", () => {
  userStorage.lobbyId = `lobby-di-${userStorage.getUsername.value}`;
  router.push("/lobby");
});

socket.on("joined", () => {
  console.log('joined!')
})
</script>
