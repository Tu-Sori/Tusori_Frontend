import { atom } from "recoil";
import { UserInfomation } from "api/mypage/mypageData";

export const stockCodeState = atom<string>({
  key: "stockCodeState",
  default: "",
});

export const userInfoState = atom<UserInfomation>({
  key: "userInfoState",
  default: {
    user_id: 0,
    nickname: "",
    email: "",
    assets: 0,
  },
});

export const saveStockNameState = atom<string>({
  key: "saveStockNameState",
  default: "",
});

export const alarmActiveState = atom<boolean>({
  key: "alarmActiveState",
  default: false,
});

export const selectedDetailsState = atom<string | null>({
  key: "selectedDetailsState",
  default: "",
});
