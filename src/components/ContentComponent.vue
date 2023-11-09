<script setup lang="ts">
import { getFileSize } from '../utils'
import type { DLC, Game, Theme, Update } from '../stores/data'
import type { PropType } from 'vue'

const { content } = defineProps({
  content: {
    type: Object as PropType<Game | Update | DLC | Theme>,
    required: true
  }
})

const hasUpdate = (content: any): content is Update => {
  return content['Update Version'] !== undefined
}

const hasZRIF = (content: any): content is Game => {
  return content.zRIF !== undefined
}

const canDownload = (PKGDirectLink: string) => (/^http.*/.test(PKGDirectLink))

const download = (link: string) => window.open(link)
const copyZRIF = (zRIF: string) => navigator.clipboard.writeText(zRIF)

</script>

<template>
  <div class="item">
    <div class="content-left">
      <div class="top-info">
        <span class="spon">{{ content.Region }}</span>
        <span class="spon" v-if="hasUpdate(content)">{{ content['Update Version'] }}</span>
        <span class="text-sm"> {{ content['Title ID'] }} </span>
      </div>
      <span> {{ content.Name }}</span>
    </div>
    <div class="content-right">
      <div class="buttons">
        <button v-if="canDownload(content['PKG direct link'])" @click="download(content['PKG direct link'])">下载</button>
        <button v-if=(hasZRIF(content)) @click="copyZRIF(content.zRIF)">复制zRIF</button>
      </div>
      <p class=" extra-info">
        <span>{{ getFileSize(content['File Size']) }}</span>
        <span>{{ content['Last Modification Date'].slice(0, 10) }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
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