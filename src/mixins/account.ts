import router from "../router";
import store from "../store";
import { Component, Vue } from "vue-property-decorator";
import {
  getTokenPayload,
  getToken,
  deleteToken
} from "../common/localstorage/token";
import { getUserInfo, deleteUserInfo } from "../common/localstorage/account";
// account 가 필수로 가져야 되는 내용들 정의한 interface
import { accountType, genderType } from "../common/types/account";

// Mixin Components
@Component
export class Account extends Vue {}

/* Mixin Component Outer variable : Vuex State 초기 값
  최초 페이지 로딩 될때 & 로그아웃 시에 사용 됨 */
export const initAccount = {
  idfAccount: 0,
  country: "empty",
  email: "empty",
  name: "empty",
  gender: genderType.Male,
  birthday: "1993-03-28",
  type: accountType.Player,
  image: "hello"
};

// Mixin Component Outer Function : 인증 체크 (로그인 한 사용자인지 판별)
export const isAuthenticated = (): boolean => {
  // 토큰 및 사용자 정보가 localStorage 에 저장되어 있는지 체크
  if (getToken() !== "null" && getUserInfo() !== "{}") {
    // 저장되어 있다면, 토큰의 경우 유효한 토큰인지 체크
    if (getTokenPayload(getToken()) === "err") {
      return false;
    }
    // 정상적인 유저의 접근
    else {
      return true;
    }
  } else {
    return false;
  }
};

// Mixin Component Outer Function : 로그아웃
export const logout = (): void => {
  deleteToken();
  deleteUserInfo();
  store.commit("logout");
  router.push({ name: "login" });
};
