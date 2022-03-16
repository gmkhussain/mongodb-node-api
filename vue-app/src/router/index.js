import { createWebHistory, createRouter } from "vue-router"

// import HomePage from "@/views/frontend/pages/HomePage.vue"
import LoginPage from "@/views/frontend/pages/LoginPage.vue"
import PageNotFound from '@/views/frontend/pages/PageNotFound.vue'

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router