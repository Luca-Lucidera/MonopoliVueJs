<template>
  <h1>Monopoly!</h1>
  <div v-if="!usernameSaved">
    <label for="username">Username: </label>
    <input type="text" id="username" v-model="username" />
    <span :style="{ visibility: visibility }"
      >Username non valido, min 3 caratteri, max 20, accettati solo - _</span
    >
    <input
      type="submit"
      value="Salva"
      :disabled="btnDisable"
      @click.prevent="saveUsername"
    />
  </div>
  <div v-else>
    <button @click="router.push('/lobby')">Crea una lobby</button>
    <button @click="router.push('/join-lobby')">Partecipa a una lobby</button>
  </div>
</template>

<script setup>
//IMPORT
import { ref, watch } from "vue";
import { useUserStore } from "../store/index";
import { useRouter } from 'vue-router'

//STATE
const username = ref("");
const visibility = ref("hidden");
const btnDisable = ref(true);
const usernameSaved = ref(false);
const router = useRouter();

//STORE
const userStorage = useUserStore();

//WATCHER
watch(username, (newUsername) => {
  const regex = /^[a-zA-Z0-9 _\-]{3,20}$/;
  console.log(visibility.value);
  if (!regex.test(newUsername)) {
    console.log("NON VALIDO");
    visibility.value = "visible";
    btnDisable.value = true;
  } else {
    console.log("VALIDO");
    visibility.value = "hidden";
    btnDisable.value = false;
  }
});

//FUNCTION
const saveUsername = () => {
  userStorage.username = username.value;
  usernameSaved.value = true;
};
</script>