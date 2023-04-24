import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/auth',
    name:'auth',
    component: () => import('@/views/AuthView.vue')
  },
  {
    path: '/control-category',
    name: 'control-category',
    component: () => import('@/views/control/ControlCategories.vue')
  },
  {
    path: '/control-product',
    name:'control-product',
    component: () => import('@/views/control/ControlProducts.vue')
  },
  {
    path: '/control-order',
    name:'control-order',
    component: () => import('@/views/control/ControlOrders.vue')
  },
  {
    path: '/analytics',
    name:'analytics',
    component: () => import('@/views/analytics/AnalyticsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
