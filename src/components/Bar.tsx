import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { InformationCircleIcon } from "@heroicons/react/solid";

import { NAME, VERSION } from "../config";

const Bar = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="w-full p-2 bg-polar-0 text-xl flex">
        <h1 className="font-bold mr-2">{NAME}</h1>
        <span className="text-polar-3">v{VERSION}</span>
        <InformationCircleIcon
          className="ml-auto w-6 cursor-pointer transition-colors hover:text-frost-2"
          onClick={() => setModalOpen(true)}
        />
      </div>
      {modalOpen && (
        <div
          className="absolute w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center p-10"
          onClick={() => setModalOpen(false)}
        >
          <br />
          <div className="w-full h-full md:w-192 md:h-128 bg-polar-0 rounded-xl p-8">
            <span className="flex text-4xl font-bold">
              <InformationCircleIcon className="w-10 mr-2" />
              <h1>{t("about") + NAME}</h1>
            </span>
            <p>idk</p>
          </div>
          <p>{t("clicktoexit")}</p>
        </div>
      )}
    </>
  );
};

export default Bar;
