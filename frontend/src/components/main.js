import { createApp } from 'vue'
import App from '../App.vue'
import '/Users/master/Desktop/Te4/projekt1/frontend/src/assets/css/main.css'
import router from '/Users/master/Desktop/Te4/projekt1/frontend/src/router/index.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

