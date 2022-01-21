import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import gb from "./gb.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  lng: "gb",
  debug: process.env.NODE_ENV !== "production",
  interpolation: {
    escapeValue: false,
  },
  resources: { gb, ru },
});

export default i18n;
