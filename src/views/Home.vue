<template>
  <div class="home">home : {{ account }}</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  // lifeCycle
  created() {
    this.account = this.$store.state.account;
  }
  // data
  account = null;
}
</script>
