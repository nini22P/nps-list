import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Region = 'ASIA' | 'EU' | 'INT' | 'JP' | 'US' | 'UNKNOWN'
export type ContentType = 'Game' | 'Update' | 'DLC' | 'Theme' | 'Demo'

export interface FilterKeywords {
  searchKeywords: string,
  sortBy: 'Name' | 'Date' | 'TitleID' | 'FileSize',
  orderBy: 'ASC' | 'DESC',
  region: Region[],
  contentType: ContentType[],
}

export const useFilterStore = defineStore(
  'filter',
  () => {
    const FILTER_KEYWORDS = ref<FilterKeywords>(
      {
        searchKeywords: '',
        sortBy: 'Date',
        orderBy: 'DESC',
        region: ['ASIA', 'EU', 'INT', 'JP', 'US', 'UNKNOWN'],
        contentType: ['Game']
      }
    )

    return { FILTER_KEYWORDS }
  },
  {
    persist: true
  }
)