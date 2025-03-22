import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/assets/css/index.css'
import '@/api/mock.js'
import api from '@/api/api'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.$api = api
app.use(pinia)
app.use(router)
app.mount('#app')
