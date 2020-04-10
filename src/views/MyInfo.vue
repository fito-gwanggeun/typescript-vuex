<template>
  <div>
    <v-btn @click="logout">logout</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { logout } from "../mixins/account";

@Component
export default class MyInfo extends Vue {
  private logout = () => {
    logout();
  };
}
</script>
