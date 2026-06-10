import localFont from "next/font/local";
import { DM_Sans, Roboto_Mono } from "next/font/google";

export const davinci = localFont({
  src: [
    { path: "../fonts/TRJNDaVinci-Regular-Trial.otf", weight: "400", style: "normal" },
    { path: "../fonts/TRJNDaVinci-Italic-Trial.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-davinci",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});
