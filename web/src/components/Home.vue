<template>
    <h1>Monopoly!</h1>
    <label for="username">Username: </label>
    <input type="text" id="username" v-model="username">
    <span :style="{visibility: visibility}">Username non valido, min 3 caratteri, max 20, accettati solo - _</span>
</template>

<script setup>
import {ref, watch} from "vue";

const username = ref('');
const visibility = ref('hidden')


watch(username, (newUsername) => {
    const regex = /^[a-zA-Z0-9 _\-]{3,20}$/
    console.log(visibility.value)
    if (!regex.test(newUsername)) {
        console.log('NON VALIDO')
        visibility.value = "visible"
    } else {
        console.log('VALIDO')
        visibility.value = "hidden";
    }
})


</script>