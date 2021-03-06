import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Landing from '../views/Landing.vue'
import RegisterC from '../views/auth/Register-Candidate.vue'
import RegisterR from '../views/auth/Register-Recruiter.vue'
import ResetPass from '../views/auth/Reset-Password.vue'
import ConfirmPass from '../views/auth/Confirm-Password.vue'
import Hire from '../views/Hire.vue'
import EditProfileC from '../views/Edit-Profile-C.vue'
import EditProfileR from '../views/Edit-Profile-Recruiter.vue'
import ProfileCompany from '@/views/ProfileCompany.vue'
import Notification from '@/views/Notification.vue'
import Profile from '../views/Profile.vue'
import Chat from '../views/Chat.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/register-candidate',
    name: 'RegisterC',
    component: RegisterC,
    meta: { requiresVisitor: true }
  },
  {
    path: '/register-recruiter',
    name: 'RegisterR',
    component: RegisterR,
    meta: { requiresVisitor: true }
  },
  {
    path: '/reset-password',
    name: 'ResetPass',
    component: ResetPass,
    meta: { requiresVisitor: true }
  },
  {
    path: '/confirm-password',
    name: 'ConfirmPass',
    component: ConfirmPass,
    meta: { requiresVisitor: true }
  },
  {
    path: '/hire',
    name: 'Hire',
    component: Hire,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-profile-c',
    name: 'EditProfileC',
    component: EditProfileC,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-profile-r',
    name: 'EditProfileR',
    component: EditProfileR,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile-company',
    name: 'ProfileCompany',
    component: ProfileCompany,
    meta: { requiresAuth: true }
  },
  {
    path: '/notification',
    name: 'Notification',
    component: Notification,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
