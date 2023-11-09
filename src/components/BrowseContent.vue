<script setup lang="ts">
import { useDataStore } from '@/stores/data'
import { computed } from 'vue'
import { timeConv } from '../utils'
import { useFilterStore } from '../stores/filter'
import { storeToRefs } from 'pinia'
import ContentComponent from './ContentComponent.vue'

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
</script>

<template>
  <div class="p-2">
    <ContentComponent v-for="(content, index) in contents" :key="index" :content="content" />
  </div>
</template>

<style scoped></style>