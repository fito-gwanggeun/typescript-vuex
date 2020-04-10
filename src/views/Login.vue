<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form </v-toolbar-title>
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
import { getTokenPayload, saveToken } from "../common/localstorage/token";
import { saveUserInfo } from "../common/localstorage/account";
import { Account, accountType, genderType } from "../common/types/account";

const TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZGZBY2NvdW50IjoxLCJjb3VudHJ5IjoiS1IiLCJlbWFpbCI6Imd3YW5nZ2V1bi5qdW5nQGZpdG9nZXRoZXIuY29tIiwibmFtZSI6Iuygleq0keq3vCIsImdlbmRlciI6Ik0iLCJiaXJ0aGRheSI6IjIwMjAwMjA0IiwidHlwZSI6IlAiLCJqdGkiOiI3ZTUwZTk3NC03ODVmLTQ5YjMtOGM4MC0yYmYyZDIzYjkyZjMiLCJpYXQiOjE1ODY0ODUyMTAsImV4cCI6MTU4NjQ4ODgxMH0.631IqnkaR8Yr4tjrbrLAOCUdTLOPpmGmgdc5vIkzSW4";

@Component
export default class Login extends Vue {
  // created() {}
  // data
  email = null;
  pwd = null;

  // methods
  login = async (email: string, pwd: string) => {
    console.log(email, pwd);
    // TODO: 로그인 API 요청

    /* 로그인 성공 시, 시나리오 */
    // 1.localStorage 에 토큰 저장
    saveToken(TOKEN);
    // 2. payload data 를 기반으로 실제 localStorage 및 Vuex 에 저장할 data setup
    const account: Account = this.setUserInfoFromPayload(TOKEN);
    // 3. 2의 정보를 바탕으로 localStorage(user_info) & Vuex State 에 회원 정보 셋업
    saveUserInfo(account);
    this.$store.commit("login", account);
    // this.$store.commit("setAccount", account);
    // 4. Home 화면으로 이동
    router.push({
      name: "home"
    });
  };
  setUserInfoFromPayload = (token: string): Account => {
    // token 에서 회원 정보를 담고 있는 payload 추출
    // eslint-disable-next-line
    const payload: any = getTokenPayload(token);
    // eslint-disable-next-line
    const account: any = {
      idfAccount: payload.idfAccount,
      country: payload.country,
      email: payload.email,
      name: payload.name,
      birthday: payload.birthday
    };
    switch (payload.gender) {
      case "M":
        account["gender"] = genderType.Male;
        break;
      case "F":
        account["gender"] = genderType.Female;
        break;
    }
    switch (payload.type) {
      case "C":
        account["type"] = accountType.Coach;
        break;
      case "P":
        account["type"] = accountType.Player;
        break;
      case "D":
        account["type"] = accountType.Default;
        break;
    }
    return account;
  };
}
</script>
