import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
import VeeValidatePlugin from './includes/validation'

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)

app.mount('#app')
