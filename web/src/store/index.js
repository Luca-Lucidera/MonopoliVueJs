import { defineStore } from "pinia";
import { computed, ref } from 'vue'

export const useUserStore = defineStore("user", () => {
    //STATE
    const username = ref('');

    //COMPUTED
    const getUsername = computed(() => username); 

    return {
        username,
        getUsername,
    }
})