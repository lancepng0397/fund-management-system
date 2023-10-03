import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/home/Index'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Portfolio from '@/components/Portfolio'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    props: true,
    path: '/funds/:fundSlug?',
    name: 'Funds',
    component: () => import(/* webpackChunkName: "funds" */ '../views/funds/Index')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/error-page/404')
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
