<template>
  <div>
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { deleteToken } from "../common/localstorage/token";
import { deleteUserInfo } from "../common/localstorage/account";
import router from "../router/index";

@Component
export default class MyInfo extends Vue {
  logout = () => {
    deleteToken();
    deleteUserInfo();
    this.$store.commit("logout");
    router.push({ name: "login" });
  };
}
</script>
