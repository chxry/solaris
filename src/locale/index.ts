import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import ru from "./ru.json";

i18n.use(initReactI18next).init({
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
  resources: { en, ru },
});

export default i18n;
