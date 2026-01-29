import type { Metadata } from "next";
import "./globals.css";
import "./styles/header.css";
import "./styles/editor.css";
import "./styles/new-styles.css";
import "./styles/Top100.css"
import './styles/new-mobil_style.css';
import './styles/custom.css';

// import Header from "@/components/layout/Header/Header";
import HeaderServer from "@/components/layout/Header/HeaderServer";
import Footer from "@/components/layout/Footer/Footer";

export const metadata: Metadata = {
  title: "КС АВТО",
  description: "Клубный сервис",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <div className="fixSizeContainer">
          <HeaderServer />
          <div className="containerPage">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}