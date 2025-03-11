import { createRouter, createWebHashHistory } from "vue-router"

//*制定路由规则
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    redirect: "/admin/home",
    component: () => import("../views/Admin/Admin.vue"),
    children: [
      {
        path: "home",
        name: "Admin-Home",
        component: () => import("../views/Admin/Home.vue"),
      },
      {
        path: "user",
        name: "Admin-User",
        component: () => import("../views/Admin/User.vue"),
      },
    ]
  },
]

const router = createRouter({
  //*设置路由模式
  history: createWebHashHistory(),
  routes,
})

export default router;
