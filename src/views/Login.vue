<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="email"
                    autocomplete="false"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="pwd"
                    label="pwd"
                    name="pwd"
                    autocomplete="false"
                    type="pwd"
                    v-model="pwd"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login(email, pwd)">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import router from "../router/index";
// import { getToken, getTokenPayload, saveToken } from "../common/token";

@Component
export default class Login extends Vue {
  // created() {}
  // data
  email = null;
  pwd = null;

  // methods
  login = async (email: string, pwd: string) => {
    console.log(email, pwd);
    // 로그인 이후, payload 를 통해 받은 사용자 정보
    const account = {
      idfAccount: 1,
      country: "KR",
      email: "gwanggeun.jung@fitogether.com",
      name: "정광근",
      gender: "M",
      birthday: "20200204",
      type: "Player"
    };
    this.$store.commit("setAccount", account);
    router.push({
      name: "home"
    });
  };
}
</script>
