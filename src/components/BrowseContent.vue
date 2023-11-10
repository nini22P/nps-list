<script setup lang="ts">
import { useDataStore, type DLC, type Game, type Theme, type Update } from '@/stores/data'
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
  let contents: Game[] | Update[] | DLC[] | Theme[] = []
  FILTER_KEYWORDS.value.contentType?.map(type => {
    switch (type) {
      case 'Game':
        contents = contents.concat(PSV_GAMES.value.data) as Game[] | Update[] | DLC[] | Theme[]
        break
      case 'Update':
        contents = contents.concat(PSV_UPDATES.value.data.map(item => { return { 'Content ID': item['Title ID'], ...item } })) as Game[] | Update[] | DLC[] | Theme[]
        break
      case 'DLC':
        contents = contents.concat(PSV_DLCS.value.data) as Game[] | Update[] | DLC[] | Theme[]
        break
      case 'Theme':
        contents = contents.concat(PSV_THEMES.value.data) as Game[] | Update[] | DLC[] | Theme[]
        break
      case 'Demo':
        contents = contents.concat(PSV_DEMOS.value.data) as Game[] | Update[] | DLC[] | Theme[]
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

const items = computed(() => sortContents(filterByRegion(filterBySearchKeywords(ALL_CONTENTS.value))))
</script>

<template>
  <VirtualList class="list" :data-key="'Content ID'" :data-sources="items" :estimate-size="80"
    :item-class="'list-item-dynamic'" ref="virtualList">
    <template #default="{ source }">
      <ContentComponent :content="source" class="max-w-3xl m-auto px-4 py-2" />
    </template>
  </VirtualList>
</template>

<style scoped>
.list {
  @apply pt-2;
  height: calc(100vh - 10.75rem);
  overflow-y: auto;
}
</style>