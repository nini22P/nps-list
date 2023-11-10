import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedStore from 'pinia-plugin-persistedstore'
import VirtualList from 'vue-virtual-list-v3'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import { zh_CN } from './i18n/zh_CN'
import { en } from './i18n/en'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
  locale: navigator.language === 'zh-CN' ? 'zh-CN' : 'en',
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zh_CN,
    en,
  },
})

pinia.use(piniaPluginPersistedStore)

app.use(pinia)
app.use(router)
app.use(VirtualList)
app.use(i18n)

app.mount('#app')
