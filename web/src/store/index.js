import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { io } from 'socket.io-client'
export const useUserStore = defineStore("user", () => {
    //STATE
    const username = ref('');
    const userSocket = io("http://localhost:3000/");
    const lobbyId = ref('')
    const pedina = ref("")
    //COMPUTED

    const getUsername = computed(() => username); 
    const getUserSocket = computed(() => userSocket)
    const getLobbyId = computed(() => lobbyId)
    const getPedina = computed(() => pedina)

    return {
        username,
        getUsername,
        userSocket,
        getUserSocket,
        lobbyId,
        getLobbyId,
        pedina,
        getPedina,
    }
})