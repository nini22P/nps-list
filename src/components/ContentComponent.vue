<script setup lang="ts">
import { type Content } from '../stores/data'
import type { PropType } from 'vue'

const { content } = defineProps({ content: { type: Object as PropType<Content>, required: true } })

const hasUpdate = (content: Content) => {
  return content['Update Version'] !== undefined
}

const hasZRIF = (content: Content) => {
  return content.zRIF !== undefined
}

const hasType = (content: Content) => {
  return content.Type !== undefined
}

const canDownload = (PKGDirectLink: string | undefined) => PKGDirectLink !== undefined && (/^http.*/.test(PKGDirectLink))

const download = (link: string | undefined) => link !== undefined && window.open(link)
const copyZRIF = (zRIF: string | undefined) => zRIF !== undefined && navigator.clipboard.writeText(zRIF)

const fileSizeConv = (fileSize: number) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(fileSize) / Math.log(1024))
  return (fileSize / Math.pow(1024, i)).toFixed(2) + ' ' + units[i]
}

const getFileSize = (fileSize: string | undefined) => Number(fileSize) ? fileSizeConv(Number(fileSize)) : null



</script>

<template>
  <div class="bg-cyan-800 flex flex-col whitespace-nowrap">
    <div class="flex flex-row justify-start items-center gap-2 text-sm">
      <span class="spon" v-if="hasType(content)">{{ content.Type }}</span>
      <span class="spon">{{ content.Region }}</span>
      <span class="spon" v-if="hasUpdate(content)">{{ content['Update Version'] }}</span>
      <span class="text-sm"> {{ content['Title ID'] }} </span>
    </div>
    <div class="flex flex-1 flex-row justify-between gap-1">
      <div class="flex flex-col justify-evenly overflow-hidden ">
        <p class="text-lg">{{ content.Name }}</p>
        <p class="text-sm text-gray-300">{{ content['Original Name'] }}</p>
      </div>
      <div class='flex flex-col justify-evenly items-end gap-1'>
        <div class="buttons">
          <button v-if="canDownload(content['PKG direct link'])" @click="download(content['PKG direct link'])">{{
            $t('common.download') }}</button>
          <button v-if=(hasZRIF(content)) @click="copyZRIF(content.zRIF)">{{ $t('common.copy') }} zRIF</button>
        </div>
        <p class="text-gray-300 text-sm space-x-3 ">
          <span>{{ getFileSize(content['File Size']) }}</span>
          <span>{{ content['Last Modification Date']?.slice(0, 10) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spon {
  @apply bg-teal-600 rounded text-center block px-1.5;
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
</style>