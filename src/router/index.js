import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '../stores/user'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Manage from '../views/ManageView.vue'
import Song from '../views/Song.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: Manage
    // beforeEnter: (to, from, next) => {
    //   console.log('Manage Guard')
    //   console.log(from, to)
    //   next()
    // }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'song',
    path:'/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  linkExactActiveClass: 'text-yellow-500'
})

// router.beforeEach((to, from, next) => {
//   console.log('GLOBAL GUARD')
//   console.log(to, from)
//   next()
// })

router.beforeEach((to, from, next) => {
  //console.log('GLOBAL GUARD')
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()
  if (store.userLoggedIn) {
    next()
    return
  } else {
    next({ name: 'home' })
  }
})

export default router
