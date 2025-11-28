import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Lessons from '../views/Lessons.vue'
import LessonDetail from '../views/LessonDetail.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: Lessons
  },
  {
    path: '/lesson/:id',
    name: 'LessonDetail',
    component: LessonDetail,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
