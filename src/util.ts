import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

import data from "../package.json";

export const NAME = data.name;
export const VERSION = data.version;
export const BUILTWITH = {
  "React.js": "https://reactjs.org",
  TailwindCSS: "https://tailwindcss.com",
  heroicons: "https://heroicons.com",
  i18next: "https://www.i18next.com",
};
export const HOURSPERYEAR = 8760;

export const round = (n: number) => +n.toFixed(2);
export const initFirebase = () => {
  const app = initializeApp({
    apiKey: "AIzaSyCB6da0KZBq-btkgF7W_WtWLaR7CnbJXow",
    authDomain: "solaris0.firebaseapp.com",
    projectId: "solaris0",
    storageBucket: "solaris0.appspot.com",
    messagingSenderId: "807261205583",
    appId: "1:807261205583:web:b7875832cc7d83955f263a",
    measurementId: "G-NHW7ZRK7W7",
  });
  getAnalytics(app);
  getPerformance(app);
};
