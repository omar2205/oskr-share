import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'

import App from './App.vue'
import Home from './components/Home.vue'
import Share from './components/Share.vue'
import NotFound from './components/NotFound.vue'

const routes = [
  {
    path: '/share',
    component: Share,
    props: (route) => ({ query: route.query }),
  },
  {
    path: '/',
    component: Home,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(Vant).use(router).mount('#app')
