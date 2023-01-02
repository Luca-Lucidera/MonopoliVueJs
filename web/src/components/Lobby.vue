<template>
  <div>Il tuo username è {{ userStorage.getUsername }}</div>
  <div>
    <div></div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/index";

const userStorage = useUserStore();
const socket = userStorage.getUserSocket();
</script>
