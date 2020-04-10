import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
// account 가 필수로 가져야 되는 내용들 정의한 interface
import { Account, accountType, genderType } from "../common/types/account";

// eslint-disable-next-line
const modules: any = {};

// modules 폴더 하위에 있는 모든 store file 가져오기
const requireModule = require.context("./modules", true, /\.ts$/);
requireModule.keys().forEach(fileName => {
  if (fileName === "./index.ts") return;
  const moduleName = fileName.replace(/(\.\/|\.ts)/gi, "");
  console.log(moduleName);
  modules[moduleName] = {
    namespaced: true,
    ...requireModule(fileName).default
  };
});

Vue.use(Vuex);

export interface RootState {
  account: Account;
}

const initAccount = {
  idfAccount: 0,
  country: "empty",
  email: "empty",
  name: "empty",
  gender: genderType.Male,
  birthday: "1993-03-28",
  type: accountType.Player,
  image: "hello"
};

const store: StoreOptions<RootState> = {
  // RootState : 로그인한 User 의 정보만 담아둔다.
  state: {
    account: initAccount
  },
  // 위에서 가져온 modules 폴더 하위의 파일들을 모두 import
  modules,
  mutations: {
    login(state, account: Account) {
      state.account = account;
    },
    logout(state) {
      state.account = initAccount;
    },
    update(state, account: Account) {
      state.account = account;
    }
  },
  actions: {
    login({ commit }, account: Account) {
      commit("setAccount", account);
    },
    logout({ commit }) {
      commit("logout");
    },
    update({ commit }, account: Account) {
      commit("update", account);
    }
  },
  getters: { data: state => state.account }
};

export default new Vuex.Store(store);
