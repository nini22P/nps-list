<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang='ts'>
import Papa from 'papaparse'
import { useDataStore, type Game, type Update, type DLC, type Theme } from '../stores/data'

type FileType = 'PSV_GAMES' | 'PSV_UPDATES' | 'PSV_DLCS' | 'PSV_THEMES' | 'PSV_DEMOS'

// type PKGLink = string | 'CART ONLY' | 'MISSING' | 'NOT REQUIRED'

const store = useDataStore()

const handleFileSelect = (event: Event, type: FileType) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length !== 0) {
    const file = target.files[0]
    Papa.parse(file, {
      delimiter: '\t',
      quoteChar: '',
      header: true,
      complete: (result: { data: Game[] | Update[] | DLC[] | Theme[] }) => {
        // console.log(result.data.map(z => z.Region).filter(y => y !== 'US' && y !== 'ASIA' && y !== 'JP' && y !== 'EU'))
        switch (type) {
          case 'PSV_GAMES':
            store.setPSVGames(result.data as Game[])
            break
          case 'PSV_UPDATES':
            store.setPSVUpdates(result.data as Update[])
            break
          case 'PSV_DLCS':
            store.setPSVDLCs(result.data as DLC[])
            break
          case 'PSV_THEMES':
            store.setPSVThemes(result.data as Theme[])
            break
          case 'PSV_DEMOS':
            store.setPSVDemos(result.data as Game[])
            break
          default:
            console.log('type error')
        }
      }
    })
  }
}

</script>

<template>
  <div class="settings">
    <p class="text-sm px-2">点击添加本地 tsv / csv 文件</p>
    <div class="grid grid-cols-2 gap-2">
      <input id="psv-games" type="file" accept=".tsv,.csv" @change="handleFileSelect($event, 'PSV_GAMES')">
      <label for="psv-games">
        <h2>PSV 游戏</h2>
        <p class="text-sm text-stone-200">更新时间: {{ store.PSV_GAMES.updateTime.slice(0, 10) }}</p>
      </label>

      <input id="psv-updates" type="file" accept=".tsv,.csv" @change="handleFileSelect($event, 'PSV_UPDATES')">
      <label for="psv-updates">
        <h2>PSV 更新</h2>
        <p class="text-sm text-stone-200">更新时间: {{ store.PSV_UPDATES.updateTime.slice(0, 10) }}</p>
      </label>

      <input id="psv-dlcs" type="file" accept=".tsv,.csv" @change="handleFileSelect($event, 'PSV_DLCS')">
      <label for="psv-dlcs">
        <h2>PSV DLC</h2>
        <p class="text-sm text-stone-200">更新时间: {{ store.PSV_DLCS.updateTime.slice(0, 10) }}</p>
      </label>

      <input id="psv-themes" type="file" accept=".tsv,.csv" @change="handleFileSelect($event, 'PSV_THEMES')">
      <label for="psv-themes">
        <h2>PSV 主题</h2>
        <p class="text-sm text-stone-200">更新时间: {{ store.PSV_THEMES.updateTime.slice(0, 10) }}</p>
      </label>

      <input id="psv-demos" type="file" accept=".tsv,.csv" @change="handleFileSelect($event, 'PSV_DEMOS')">
      <label for="psv-demos">
        <h2>PSV DEMOS</h2>
        <p class="text-sm text-stone-200">更新时间: {{ store.PSV_DEMOS.updateTime.slice(0, 10) }}</p>
      </label>
    </div>
  </div>
</template>

<style scoped>
.settings {
  @apply px-4 space-y-2;
}

input[type="file"] {
  display: none;
}

input[type="file"]+label {
  @apply block cursor-pointer bg-cyan-900 p-2 rounded-md shadow;
}
</style>