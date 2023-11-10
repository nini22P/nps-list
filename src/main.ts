import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedStore from 'pinia-plugin-persistedstore'
import VirtualList from 'vue-virtual-list-v3'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedStore)

app.use(pinia)
app.use(router)
app.use(VirtualList)

app.mount('#app')
