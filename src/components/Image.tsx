import React from "react";
import { useTranslation } from "react-i18next";

const Image = ({
  src,
  alt,
  author,
  platform,
}: {
  src: string;
  alt: string;
  author: string;
  platform: string;
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative mx-12 my-6">
      <img src={src} alt={alt} className="md:h-100 rounded-md" />
      <p className="absolute bottom-0 text-sm opacity-40 bg-black rounded-tr-xl rounded-bl-xl p-0.5">
        {t("attribute photo", {
          author,
          platform,
        })}
      </p>
    </div>
  );
};

export default Image;
