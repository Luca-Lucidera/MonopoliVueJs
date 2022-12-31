<template>
  <div>Il tuo username è {{ userStorage.getUsername }}</div>
  <div>
    <div></div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/index";
import { io } from 'socket.io-client'

const socket = io();
const userStorage = useUserStore();
</script>
