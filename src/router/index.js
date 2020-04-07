import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage/index.vue")
  },
  {
    path: "/my",
    name: "My",
    component: () => import("@/views/My/index.vue")
  },
  {
    path: "/shopping",
    name: "ShoppingCart",
    component: () => import("@/views/ShoppingCart/index.vue")
  },
  {
    path: "/classification",
    name: "Classification",
    component: () => import("@/views/Classification/index.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("@/views/Reg/index.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
