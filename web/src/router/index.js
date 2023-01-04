import Home from "../components/Home.vue";
import Lobby from '../components/Lobby.vue'
import Search from '../components/SearchLobby.vue'
import Game from '../components/Game.vue'

import { createRouter, createWebHistory} from 'vue-router'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "",
            component: Home
        },
        {
            path: "/lobby",
            component: Lobby 
        },
        {
            path: "/search",
            component: Search
        },
        {
            path: "/game",
            component: Game 
        }
    ]
})