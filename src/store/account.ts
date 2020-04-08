export type accountType = "Player" | "Coach" | "Default";
export type genderType = "Male" | "Female";

// account 가 필수로 가져야 되는 내용들 정의한 interface
interface Account {
  idfAccount: number;
  country: string;
  email: string;
  name: string;
  gender: genderType;
  birthday: string;
  type: accountType;
  // Optional Chaining: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html
  image?: string;
}

export default Account;
