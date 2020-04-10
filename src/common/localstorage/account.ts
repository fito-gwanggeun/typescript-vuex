import { Account } from "../types/account";

const KEY = "user_info";

// 로그인 하고 있는 사용자의 최신 정보를 저장
export const saveUserInfo = (userInfo: Account) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(userInfo));
  } catch (err) {
    return err;
  }
};

/* 로그인 하고 있는 사용자의 최신 정보
   이 정보를 참고해서 vuex에 로그인 한 사용자의 정보를 최신 정보로 갱신시킨다 */
export const getUserInfo = () => {
  try {
    /* [ Non-null assertion operator ]
       https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator */
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch (err) {
    return err;
  }
};

// 유저 정보를 삭제하는 경우 ( 로그아웃, 토큰 기간 만료 등 )
export const deleteUserInfo = () => {
  localStorage.removeItem(KEY);
};
