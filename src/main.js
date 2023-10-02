import './assets/base.css'
import './assets/main.css'

import { auth } from './includes/firebase'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './includes/validation'

import Icon from './directives/icon'

let app

// wait for firebase before creating the application.
// prevent the application from loading yet again if the app is already initialized

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    app.use(VeeValidatePlugin)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})
