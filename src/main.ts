// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(router)

// app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import {createPinia,setActivePinia} from 'pinia'
import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'
import { useTestStore } from './composables/store'

DashboardLayout
const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(setActivePinia(createPinia())).use(router)
const store = useTestStore()
app.mount('#app')


