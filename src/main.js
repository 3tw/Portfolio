import { createApp } from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)

app.use(VueGtag, {
  property: {
    id: 'UA-157606098-1'
  }
})

app.mount('#app')
