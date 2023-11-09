<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/filter'

const store = useFilterStore()
const { FILTER_KEYWORDS } = storeToRefs(store)

</script>

<template>
  <!-- <p>{{ FILTER_KEYWORDS }}</p> -->
  <div class="filter-box">
    <div class="serach-box">
      <input type="text" class="search" v-model="FILTER_KEYWORDS.searchKeywords">

      <select v-model="FILTER_KEYWORDS.sortBy">
        <option value="Date">日期</option>
        <option value="Name">名称</option>
      </select>
    </div>

    <div class="checkboxs">
      <input type="checkbox" id="filter-game" value="Game" v-model="FILTER_KEYWORDS.contentType">
      <label for="filter-game">游戏</label>

      <input type="checkbox" id="filter-update" value="Update" v-model="FILTER_KEYWORDS.contentType">
      <label for="filter-update">更新</label>

      <input type="checkbox" id="filter-dlc" value="DLC" v-model="FILTER_KEYWORDS.contentType">
      <label for="filter-dlc">DLC</label>

      <input type="checkbox" id="filter-theme" value="Theme" v-model="FILTER_KEYWORDS.contentType">
      <label for="filter-theme">主题</label>

      <input type="checkbox" id="filter-demo" value="Demo" v-model="FILTER_KEYWORDS.contentType">
      <label for="filter-demo">DEMO</label>
    </div>
    <div class="checkboxs">
      <input type="checkbox" id="asia" value="ASIA" v-model="FILTER_KEYWORDS.region">
      <label for="asia">ASIA</label>

      <input type="checkbox" id="eu" value="EU" v-model="FILTER_KEYWORDS.region">
      <label for="eu">EU</label>

      <input type="checkbox" id="int" value="INT" v-model="FILTER_KEYWORDS.region">
      <label for="int">INT</label>

      <input type="checkbox" id="jp" value="JP" v-model="FILTER_KEYWORDS.region">
      <label for="jp">JP</label>

      <input type="checkbox" id="us" value="US" v-model="FILTER_KEYWORDS.region">
      <label for="us">US</label>

      <input type="checkbox" id="unknown" value="UNKNOWN" v-model="FILTER_KEYWORDS.region">
      <label for="unknown">UNKNOWN</label>
    </div>

  </div>
</template>

<style scoped>
.filter-box {
  @apply px-4 flex flex-col gap-1;
}

.serach-box {
  @apply flex gap-1;
}

.search {
  @apply flex-auto px-2 py-1 rounded text-lg;
}

select {
  @apply rounded;
}

.checkboxs {
  @apply flex gap-2 select-none;
}

.checkboxs input,
label {
  @apply cursor-pointer;
}
</style>
