<template>
  <div class="home">
    home : {{ account }}
    <v-btn @click="movePage">move to my page</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getUserInfo } from "../common/localstorage/account";
import { getToken } from "../common/localstorage/token";
import router from "../router";

@Component
export default class Home extends Vue {
  // lifeCycle
  created() {
    this.account = this.$store.state.account;
    const LocalStorageAccount = getUserInfo();
    const token = getToken();
    console.log("LocalStorageAccount", LocalStorageAccount);
    console.log("token", token);
  }
  // data
  account = null;

  movePage = () => {
    router.push({ name: "my-info" });
  };
}
</script>
