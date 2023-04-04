import { atom } from "recoil";
import { UrlData } from "../components/PreviewUrl";

export const sharePopupState = atom({
  key: "sharePopupState",
  default: false,
});

export const currentHtmlInfoState = atom<UrlData>({
  key: "currentHtmlInfoState",
  default: {},
});
