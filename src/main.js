import { createApp } from 'vue'
import App from './App.vue'
import VueGtag from 'vue-gtag'

createApp(App).mount('#app')

// config. for VueAnalytics
Vue.use(VueGtag, {
  config: { id: 'UA-157606098-1' }
})
