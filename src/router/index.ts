import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
// 인증 된 사용자 인지 체크
import { isAuthenticated, logout } from "../mixins/account";
// views
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import MyInfo from "../views/MyInfo.vue";

Vue.use(VueRouter);

/* eslint-disable */
const authCheck = (_: any, from: any, next: any) => {
  if (isAuthenticated()) {
    next();
  } else {
    // logout 후, back Button 으로 인증된 페이지에 접근하는 것을 방지
    if (from.name === "login") {
      next(false);
    } else {
      logout();
    }
  }
};

/* [ beforeEnter 에 isAuthenticated 로직을 추가한 이유 ]
  : 사용자가 임의로 URL 을 치고 들어오거나, 로그아웃 후 back 버튼을 통해 인증 된 페이지를 접근하려는 상황을 막기 위한 목적 */
const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: Home
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: (_, __, next) => {
      if (isAuthenticated()) {
        next({ name: "home" });
      } else {
        next();
      }
    },
    component: Login
  },
  {
    path: "/my-info",
    name: "my-info",
    beforeEnter: (to, from, next) => authCheck(to, from, next),
    component: MyInfo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
