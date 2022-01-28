import data from "../package.json";

export const NAME = data.name;
export const VERSION = data.version;
export const BUILTWITH = {
  "React.js": "https://reactjs.org",
  TailwindCSS: "https://tailwindcss.com",
  heroicons: "https://heroicons.com",
  i18next: "https://www.i18next.com",
};

export const truncate = (n: number) => +n.toFixed(2);
