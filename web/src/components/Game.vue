<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store';
import axios from 'axios'
const tabellone = ref({});

onMounted(async () => {
    try {
        const { data } = await axios.get('http://localhost:3000/tabellone');
        tabellone.value = data.tabellone
        console.log(tabellone.value)
    } catch (error) {
        console.error(error)
    }
});
//STORAGE
const userStorage = useUserStore();
const pedina = userStorage.getPedina.value;
</script>

<template>
    <h1>Pedina scelta dal server: {{ pedina }}</h1>
    <div class="grid">
        <div class="gridCell" v-for="(cell, index) in tabellone.top" :key="index">
            <div v-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r1" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r2" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r3" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r4" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r5" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r6" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r7" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r8" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div :class="index % 2 == 0 ? 'gridCell' : 'gridcellButBetter'" v-for="(cell, index) in tabellone.r9" :key="index">
            <div v-if="cell.name == 'VOID'"></div>
            <div v-else-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
                <div> {{ cell.price }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
            </div>
        </div>
        <div class="gridCell" v-for="(cell, index) in tabellone.bottom" :key="index">

            {{ index }}
            <div v-if="!cell.isIcon">
                <div :style="{ backgroundColor: cell.colorHeader, height: '20px' }"></div>
                <div> {{ cell.name }}</div>
            </div>
            <div v-else>
                <div :style="{ width: cell.icon.width, height: cell.icon.height }">{{ cell.name }}</div>
                <div>{{ cell.icon.emoji }}</div>
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
    height: 1100px;
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