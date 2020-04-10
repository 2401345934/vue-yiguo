import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "Nav"
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: "/details",
    name: "Details",
    component: () => import("@/views/Details/index.vue")
  },
  {
    path: "/city",
    name: "City",
    component: () => import("@/views/City/index.vue")
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("@/views/Product/index.vue")
  },
  {
    path: "/nav",
    name: "Nav",
    component: () => import("@/views/Nav/index.vue"),
    redirect: "/homepage",
    children: [
      {
        path: "/homepage",
        name: "HomePage",
        component: () => import("@/views/HomePage/index.vue")
      },
      {
        path: "/my",
        name: "My",
        component: () => import("@/views/My/index.vue")
      },
      {
        path: "/bigimg",
        name: "Bigimg",
        component: () => import("@/views/Bigimg/index.vue")
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
      }
    ]
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("@/views/Reg/index.vue")
  }
];

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => {
  if (to.path === "/shopping") {
    if (localStorage.getItem("token")) {
      next();
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
});

export default router;
