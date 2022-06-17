import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("@/components/TutorialsList")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("@/components/Tutorial")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/components/AddTutorial")
  },
    // login 관련 메뉴
  {
    path: "/login",
    component: () => import("@/views/Login")
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
