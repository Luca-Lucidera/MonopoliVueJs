import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { io } from 'socket.io-client'
export const useUserStore = defineStore("user", () => {
    //STATE
    const username = ref('');
    const userSocket = io();

    //COMPUTED
    const getUsername = computed(() => username); 
    const getUserSocket = computed(() => userSocket)

    return {
        username,
        getUsername,
        userSocket,
        getUserSocket,
    }
})