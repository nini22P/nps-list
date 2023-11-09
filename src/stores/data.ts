import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Game {
  'Title ID': string,
  'Region': string,
  'Name': string,
  'PKG direct link': string,
  'zRIF': string,
  'Content ID': string,
  'Last Modification Date': string,
  'Original Name': string,
  'File Size': string,
  'SHA256': string,
  'Required FW': string,
  'App Version': string,
}

export interface Update {
  'Title ID': string,
  'Region': string,
  'Name': string,
  'Update Version': string,
  'Required FW VERSION': string,
  'PKG direct link': string,
  'Last Modification Date': string,
  'File Size': string,
  'SHA256': string,
}

export interface DLC {
  'Title ID': string,
  'Region': string,
  'Name': string,
  'PKG direct link': string,
  'zRIF': string,
  'Content ID': string,
  'Last Modification Date': string,
  'File Size': string,
  'SHA256': string,
}

export interface Theme {
  'Title ID': string,
  'Region': string,
  'Name': string,
  'PKG direct link': string,
  'zRIF': string,
  'Content ID': string,
  'Last Modification Date': string,
  'File Size': string,
  'SHA256': string,
  'Required FW': string,
}



export const useDataStore = defineStore(
  'data',
  () => {
    const PSV_GAMES = ref<{ updateTime: string, data: Game[] }>({ updateTime: '', data: [] })
    const PSV_UPDATES = ref<{ updateTime: string, data: Update[] }>({ updateTime: '', data: [] })
    const PSV_DLCS = ref<{ updateTime: string, data: DLC[] }>({ updateTime: '', data: [] })
    const PSV_THEMES = ref<{ updateTime: string, data: Theme[] }>({ updateTime: '', data: [] })
    const PSV_DEMOS = ref<{ updateTime: string, data: Game[] }>({ updateTime: '', data: [], })

    const setPSVGames = (games: Game[]) => PSV_GAMES.value = { updateTime: (new Date()).toISOString(), data: games }
    const setPSVUpdates = (updates: Update[]) => PSV_UPDATES.value = { updateTime: (new Date()).toISOString(), data: updates }
    const setPSVDLCs = (dlcs: DLC[]) => PSV_DLCS.value = { updateTime: (new Date()).toISOString(), data: dlcs }
    const setPSVThemes = (themes: Theme[]) => PSV_THEMES.value = { updateTime: (new Date()).toISOString(), data: themes }
    const setPSVDemos = (demos: Game[]) => PSV_DEMOS.value = { updateTime: (new Date()).toISOString(), data: demos }



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