import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  TranslateIcon,
  CogIcon,
  InformationCircleIcon,
  HeartIcon,
} from "@heroicons/react/solid";
import { CircleFlag } from "react-circle-flags";

import { LANGS } from "../locale";
import { NAME, VERSION } from "../config";

const Bar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);

  return (
    <>
      <div className="w-full p-2 bg-polar-0 text-xl flex">
        <a
          className="font-bold mr-2 cursor-pointer transition-colors hover:text-frost-2"
          onClick={() => navigate("/")}
        >
          {NAME}
        </a>
        <span className="text-polar-3">v{VERSION}</span>
        <span className="flex ml-auto relative">
          {localeOpen && (
            <div className="absolute right-7 w-max top-7 bg-polar-0 rounded-md drop-shadow font-md">
              {Object.keys(LANGS).map((lang) => (
                <button
                  className={
                    "flex items-center text-left p-1.5 transition-colors hover:bg-frost-2 rounded-md w-full" +
                    (i18n.language === lang ? " bg-polar-1" : "")
                  }
                  onClick={() => {
                    i18n.changeLanguage(lang);
                    localStorage.setItem("lang", lang);
                    setLocaleOpen(false);
                  }}
                  key={lang}
                >
                  <CircleFlag countryCode={lang} className="h-5 mr-2" />
                  {LANGS[lang]}
                </button>
              ))}
            </div>
          )}
          <TranslateIcon
            className="w-6 cursor-pointer transition-colors hover:text-frost-2"
            onClick={(e) => setLocaleOpen(!localeOpen)}
          />
          <CogIcon className="w-6 transition-colors hover:text-polar-3" />
          <InformationCircleIcon
            className="w-6 cursor-pointer transition-colors hover:text-frost-2"
            onClick={() => setModalOpen(true)}
          />
        </span>
      </div>
      {modalOpen && (
        <div
          className="fixed w-screen h-screen bg-black bg-opacity-50 flex flex-col items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <br />
          <div className="w-full h-full md:w-192 md:h-128 bg-polar-0 rounded-xl p-8 relative">
            <span className="flex text-4xl font-bold">
              <InformationCircleIcon className="w-10 mr-2" />
              <h1>{t("about.title") + NAME}</h1>
            </span>
            <h2 className="text-xl">{t("common.tagline")}</h2>
            <a
              className="text-xl underline cursor-pointer transition-colors hover:text-frost-2"
              href="https://github.com/chxry/solaris"
              target="_blank"
            >
              {t("about.repo")}
            </a>
            <div className="absolute bottom-8">
              <p>{`${NAME} v${VERSION} - React ${React.version}`}</p>
              <p className="flex items-center whitespace-pre">
                <Trans
                  i18nKey="about.authors"
                  values={{ authors: "Alex T, Gosha T & Luca E" }}
                  t={t}
                  components={[<HeartIcon className="h-5 text-red" />]}
                />
              </p>
            </div>
          </div>
          <p>{t("about.exit")}</p>
        </div>
      )}
    </>
  );
};

export default Bar;
