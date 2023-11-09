<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { computed } from 'vue'
import { getFileSize, canDownload, timeConv } from '../utils'
import { useFilterStore } from '../stores/filter'
import { storeToRefs } from 'pinia'

const dataStore = useDataStore()
const filterStore = useFilterStore()

const { PSV_GAMES, PSV_UPDATES, PSV_DLCS, PSV_THEMES, PSV_DEMOS } = storeToRefs(dataStore)
const { FILTER_KEYWORDS } = storeToRefs(filterStore)

const ALL_CONTENTS = computed(() => {
  let contents: any[] = []
  FILTER_KEYWORDS.value.contentType?.map(type => {
    switch (type) {
      case 'Game':
        contents = contents.concat(PSV_GAMES.value.data)
        break
      case 'Update':
        contents = contents.concat(PSV_UPDATES.value.data)
        break
      case 'DLC':
        contents = contents.concat(PSV_DLCS.value.data)
        break
      case 'Theme':
        contents = contents.concat(PSV_THEMES.value.data)
        break
      case 'Demo':
        contents = contents.concat(PSV_DEMOS.value.data)
        break
      default:
        break
    }
  })
  return contents
})

const filterBySearchKeywords = (contents: any[]) => contents
  .filter(content => [content['Content ID'], content.Name, content['Original Name'], content['Title ID']]
    .some(item => item?.toLowerCase().includes(FILTER_KEYWORDS.value.searchKeywords.toLowerCase())))

const filterByRegion = (contents: any[]) => contents
  .filter(content => FILTER_KEYWORDS.value.region?.some(region => content.Region?.includes(region)))

const sortContents = (contents: any[]) => (FILTER_KEYWORDS.value.sortBy === 'Date')
  ? contents.sort((a, b) => timeConv(b['Last Modification Date']) - timeConv(a['Last Modification Date']))
  : contents.sort((a, b) => a.Name.localeCompare(b.Name, undefined, { numeric: true }))

const contents = computed(() => sortContents(filterByRegion(filterBySearchKeywords(ALL_CONTENTS.value))))

const download = (link: string) => window.open(link)

const copyZRIF = (zRIF: string) => navigator.clipboard.writeText(zRIF)

</script>

<template>
  <div class="content">
    <div v-for="(content, index) in contents" :key="index" class="item">
      <div class="content-left">
        <div class="top-info">
          <span class="spon">{{ content.Region }}</span>
          <span class="spon" v-if="content['Update Version']">{{ content['Update Version'] }}</span>
          <span class="text-sm"> {{ content['Title ID'] }} </span>
        </div>
        <span> {{ content.Name }}</span>
      </div>
      <div class="content-right">
        <div class="buttons">
          <button @click="download(content['PKG direct link'])" :disabled="!canDownload(content['PKG direct link'])">
            {{ canDownload(content['PKG direct link']) ? '下载' : content['PKG direct link'] }}
          </button>
          <button @click="copyZRIF(content.zRIF)" :disabled="content.zRIF === 'MISSING'">
            {{ (content.zRIF === 'MISSING') ? 'MISSING' : '复制zRIF' }}
          </button>
        </div>
        <p class="extra-info">
          <span>{{ getFileSize(content['File Size']) }}</span>
          <span>{{ content['Last Modification Date'].slice(0, 10) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  @apply p-2;
}

.item {
  @apply bg-cyan-800 p-2 flex gap-2 justify-between items-center;
}

.content-left {
  @apply flex flex-col gap-2 items-start whitespace-nowrap overflow-hidden;
}

.top-info {
  @apply flex flex-row justify-center items-center gap-2 text-sm;
}

.spon {
  @apply bg-teal-600 rounded text-center block w-12;
}

.content-right {
  @apply flex flex-1 flex-col items-end gap-1 whitespace-nowrap;
}

.buttons {
  @apply flex gap-2;
}

.buttons button {
  @apply bg-cyan-700 text-slate-100 px-2 py-0.5 rounded;
}

.buttons button:hover {
  @apply bg-teal-600 text-white drop-shadow;
}

.buttons button:disabled {
  @apply bg-cyan-800;
}

.extra-info {
  @apply text-slate-200 text-sm space-x-3;
}
</style>