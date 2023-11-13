import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Content {
  'Title ID': string,
  'Region': string,
  'Name': string,
  'Update Version': string,
  'PKG direct link': string,
  'zRIF': string,
  'Content ID'?: string,
  'Last Modification Date': string,
  'Original Name'?: string,
  'File Size': string,
  'SHA256': string,
  'Required FW'?: string,
  'Required FW VERSION'?: string,
  'App Version?'?: string,
  'Type'?: 'GAME' | 'UPDATE' | 'DLC' | 'THEME' | 'DEMO',
}

export const useDataStore = defineStore(
  'data',
  () => {
    const PSV_GAMES = ref<{ updateTime: string, data: Content[] }>({ updateTime: '', data: [] })
    const PSV_UPDATES = ref<{ updateTime: string, data: Content[] }>({ updateTime: '', data: [] })
    const PSV_DLCS = ref<{ updateTime: string, data: Content[] }>({ updateTime: '', data: [] })
    const PSV_THEMES = ref<{ updateTime: string, data: Content[] }>({ updateTime: '', data: [] })
    const PSV_DEMOS = ref<{ updateTime: string, data: Content[] }>({ updateTime: '', data: [], })

    const setPSVGames = (games: Content[]) => PSV_GAMES.value = { updateTime: (new Date()).toISOString(), data: games }
    const setPSVUpdates = (updates: Content[]) => PSV_UPDATES.value = { updateTime: (new Date()).toISOString(), data: updates }
    const setPSVDLCs = (dlcs: Content[]) => PSV_DLCS.value = { updateTime: (new Date()).toISOString(), data: dlcs }
    const setPSVThemes = (themes: Content[]) => PSV_THEMES.value = { updateTime: (new Date()).toISOString(), data: themes }
    const setPSVDemos = (demos: Content[]) => PSV_DEMOS.value = { updateTime: (new Date()).toISOString(), data: demos }

    return {
      PSV_GAMES,
      PSV_UPDATES,
      PSV_DLCS,
      PSV_THEMES,
      PSV_DEMOS,
      setPSVGames,
      setPSVUpdates,
      setPSVDLCs,
      setPSVThemes,
      setPSVDemos,
    }
  },
  {
    persist: {
      type: 'db',
      key: 'data',
      paths: undefined,
      beforeRestore: undefined,
      afterRestore: undefined,
      debug: false,
    }
  },
)