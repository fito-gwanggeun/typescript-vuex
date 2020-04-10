import jwtDecode from "jwt-decode";

const KEY = "user_token";

// 토큰을 가져오는 경우 (API 요청시 필요)
export const getToken = (): string => {
  try {
    return localStorage.getItem(KEY) || "null";
  } catch (err) {
    return err;
  }
};

// 토큰의 payload 를 보려는 경우
export const getTokenPayload = (token: string) => {
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (err) {
    console.error(err);
    return "err";
  }
};

// 토큰 저장하는 경우
export function saveToken(token: string) {
  try {
    localStorage.setItem(KEY, token);
  } catch (err) {
    return err;
  }
}

// 토큰을 삭제하는 경우 ( 로그아웃, 토큰 기간 만료 등 )
export const deleteToken = () => {
  localStorage.removeItem(KEY);
};
