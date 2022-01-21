import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import gb from "./gb.json";
import ru from "./ru.json";
import jp from "./jp.json";

export const LANGS = {
  gb: "English",
  ru: "Русский",
  jp: "日本語",
};

let lang = localStorage.getItem("lang");
if (!lang) {
  localStorage.setItem("lang", "gb");
  lang = "gb";
}
i18n.use(initReactI18next).init({
  lng: lang,
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: { gb, ru, jp },
});

export default i18n;
