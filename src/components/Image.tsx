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
    <div className="relative mx-12">
      <img src={src} alt={alt} className="h-96 rounded-xl" />
      <p className="absolute bottom-0.5 left-1 text-sm opacity-50">
        {t("attribute photo", {
          author,
          platform,
        })}
      </p>
    </div>
  );
};

export default Image;
