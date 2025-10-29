import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/Landing-page.vue'
import Login from '../views/auth/LoginView.vue'
import Signup from '../views/auth/SignupView.vue'
import Dashboard from '../views/DashboardView.vue'
import Tickets from '../views/Tickets-View.vue'
import { getSession } from '../utils/authUtils'


function requireAuth(to, from, next) {
  const session = getSession()
  if (!session) {
   
    alert('Your session has expired, please log in again.')
    next('/auth/login')
  } else {
    next()
  }
}

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: Login },
  { path: '/auth/signup', name: 'Signup', component: Signup },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth, 
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    beforeEnter: requireAuth, 
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
