<script setup>
//IMPORT
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/index'
import axios from 'axios'
import { useRouter } from 'vue-router';
//STORE
const userStore = useUserStore();
const socket = userStore.getUserSocket;
const username = userStore.getUsername;

//REF
const isLoading = ref(true)
const fetchError = ref(null)
const listLobby = ref([]);
const router = useRouter();

//FUNCTION
const test = (username, lobbyId) => {
  userStore.lobbyId = lobbyId
  socket.emit('join-lobby', username, lobbyId)
}

const fetchData = async () => {
  try {
    isLoading.value = true
    const { data } = await axios.get('http://localhost:3000/lobby')
    isLoading.value = false;
    listLobby.value = [...data]
  } catch (ex) {
    fetchError.value = ex;
    console.error(ex)
  }
}

//LIFE CYCLE HOOK
onMounted(fetchData)


//SOCKET EVENT
socket.on('joined', () =>  {
  router.push('/lobby')
})
</script>

<template>
  <h1>Username {{ username }}</h1>
  <div v-if="isLoading">Caricando i dati dal server...</div>
  <div v-else-if="fetchError">{{ fetchError }}</div>
  <div v-else>
    <button @click="fetchData">Refresh</button>
    <div v-for="(lobbyId, index) in listLobby" :key="index">
      <hr />
      <div>Nome lobby: {{ lobbyId }} | </div>
      <div><button @click="test(username, lobbyId)">Unisciti alla lobby!</button></div>
      <hr />
      <br>
    </div>
  </div>
</template>