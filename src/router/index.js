import { createRouter, createWebHashHistory } from "vue-router"

//*制定路由规则
const routes = [
  {
    path: "/tailwind",
    name: "Tailwind",
    component: () => import("../views/tailwind.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/home2",
    name: "Home2",
    component: () => import("../views/Home2.vue"),
  },
  {
    path: "/home3",
    name: "Home3",
    component: () => import("../views/Home3.vue"),
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
        path: "users",
        name: "Admin-Users",
        component: () => import("../views/Admin/Users.vue"),
      },
      {
        path: "events",
        name: "Admin-Events",
        component: () => import("../views/Admin/Events.vue"),
      },
      {
        path: "groups",
        name: "Admin-Groups",
        component: () => import("../views/Admin/Groups.vue"),
      },
      {
        path: "venues",
        name: "Admin-Venues",
        component: () => import("../views/Admin/Venues.vue"),
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
