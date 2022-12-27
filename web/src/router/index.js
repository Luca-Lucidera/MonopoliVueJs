import Home from "../components/Home.vue";
import { createRouter, createWebHistory} from 'vue-router'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "",
            component: Home
        }
    ]
})