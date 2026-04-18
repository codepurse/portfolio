import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "../styles/global.scss";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
