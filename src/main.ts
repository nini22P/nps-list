import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedStore from 'pinia-plugin-persistedstore'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedStore)

app.use(pinia)
app.use(router)

app.mount('#app')
