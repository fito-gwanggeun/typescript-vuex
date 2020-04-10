import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// views
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MyInfo from "../views/MyInfo.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/my-info",
    name: "my-info",
    component: MyInfo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
