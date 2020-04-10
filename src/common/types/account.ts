export enum accountType {
  Player = "Player",
  Coach = "Coach",
  Default = "Default"
}

export enum genderType {
  Male = "Male",
  Female = "Female"
}

// account 가 필수로 가져야 되는 내용들 정의한 interface
export interface Account {
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
