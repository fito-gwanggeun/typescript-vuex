import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import { getUserInfo } from "./common/localstorage/account";
// 인증 된 사용자 인지 체크
import { isAuthenticated } from "./mixins/account";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  async created() {
    // 인증된 사용자가 page 를 새고로침 하는 경우 Vuex 에 인증된 사용자의 정보를 셋업해줘야 한다.
    if (isAuthenticated()) {
      const account = getUserInfo();
      store.commit("login", account);
    }
  },
  render: h => h(App)
}).$mount("#app");
