<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/filter'

const store = useFilterStore()
const { FILTER_KEYWORDS } = storeToRefs(store)

</script>

<template>
  <div class="border-b border-teal-900">
    <div class="filter-box">
      <div class="serach-box">
        <input type="text" class="search" v-model="FILTER_KEYWORDS.searchKeywords">
      </div>

      <div class="flex flex-row gap-2 justify-between">

        <div class="flex flex-col gap-2">
          <div class="checkboxs">
            <input type="checkbox" id="filter-game" value="Game" v-model="FILTER_KEYWORDS.contentType">
            <label for="filter-game">{{ $tc('type.games') }}</label>

            <input type="checkbox" id="filter-update" value="Update" v-model="FILTER_KEYWORDS.contentType">
            <label for="filter-update">{{ $tc('type.updates') }}</label>

            <input type="checkbox" id="filter-dlc" value="DLC" v-model="FILTER_KEYWORDS.contentType">
            <label for="filter-dlc">{{ $tc('type.dlcs') }}</label>

            <input type="checkbox" id="filter-theme" value="Theme" v-model="FILTER_KEYWORDS.contentType">
            <label for="filter-theme">{{ $tc('type.themes') }}</label>

            <input type="checkbox" id="filter-demo" value="Demo" v-model="FILTER_KEYWORDS.contentType">
            <label for="filter-demo">{{ $tc('type.demos') }}</label>
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

        <div class="flex flex-col justify-around">
          <p class="px-1.5 text-sm text-right">{{ $t('common.sort') }}</p>
          <select v-model="FILTER_KEYWORDS.sortBy">
            <option value="Date">{{ $t('common.date') }}</option>
            <option value="Name">{{ $t('common.title') }}</option>
          </select>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
.filter-box {
  @apply px-4 pb-2 flex flex-col gap-2 max-w-3xl m-auto;
}

.serach-box {
  @apply flex gap-1;
}

.search {
  @apply flex-auto px-2 py-1 rounded text-lg;
}

select {
  @apply rounded p-1;
}

.checkboxs {
  @apply flex gap-2 select-none;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]+label {
  @apply cursor-pointer px-1.5 py-0.5 rounded text-slate-200 text-sm;
}

input[type="checkbox"]:checked+label {
  @apply bg-cyan-600 text-white;
}

@media (any-hover: hover) {
  input[type="checkbox"]:hover+label {
    @apply bg-cyan-700;
  }
}

input[type="checkbox"]:active+label {
  @apply bg-cyan-700 shadow;
}
</style>
