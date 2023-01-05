<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "../store";
import axios from "axios";

//REF
const tabellone = ref({});
const myInfo = ref({}); //IL NUMERO RAPPRESENTA L'ID
const gameInfo = ref([]);

//STORAGE
const userStorage = useUserStore();
const socket = userStorage.getUserSocket;
const pedina = userStorage.getPedina.value
//LIFE CYCLE HOOK
onMounted(async () => {
  try {
    const { data } = await axios.get("http://localhost:3000/tabellone");
    tabellone.value = data.tabellone;
    if (userStorage.getUsername.value == userStorage.getOwner.value)
      socket.emit("game-info", userStorage.getLobbyId.value);
  } catch (error) {
    console.error(error);
  }
});

//SOCKET EVENT
socket.on("game-update", (serverGameInfo) => {
  gameInfo.value = serverGameInfo;
  console.log(gameInfo.value)
  serverGameInfo.forEach((player) => {
    if (player.username == userStorage.getUsername.value) {
      myInfo.value = player;
    }
  });
});
</script>

<template>
  <h1>Pedina scelta dal server: {{ pedina }}</h1>
  <div>
    <button :disabled="!myInfo.yourTurn" @click="socket.emit('tira-dadi', userStorage.getLobbyId.value)">Tira i
      dadi!</button>
  </div>
  <div class="grid">
    <div class="gridCell" v-for="(cell, index) in tabellone.top" :key="index">
      <div v-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r1" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r2" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r3" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r4" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r5" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r6" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r7" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r8" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r9" :key="index">
      <div v-if="cell.name == 'VOID'"></div>
      <div v-else-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
        <div>{{ cell.price }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
    <div class="gridCell" v-for="(cell, index) in tabellone.bottom" :key="index">
      <div v-if="!cell.isIcon">
        <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
        <div>{{ cell.name }}</div>
      </div>
      <div v-else>
        <div :style="{ width: cell.icon.width, height: cell.icon.height }">
          {{ cell.name }}
        </div>
        <div>{{ cell.icon.emoji }}</div>
      </div>
      <div>
        <template v-for="player in gameInfo">
          <div v-if="player.posizione == cell.id" style="display: inline;">{{ player.pedina }}</div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto;
  background-color: #85eda1;
  width: fit-content;
  height: fit-content;
  text-align: center;
  margin: auto;
  margin-top: 2%;
  color: black;
}

.gridCell {
  padding: 20px;
}

.gridcellButBetter {
  grid-column: 2 / 11;
}
</style>
