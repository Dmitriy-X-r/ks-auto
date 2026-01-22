import type { Metadata } from "next";
import "./globals.css";
import "./styles/header.css"
import "./styles/editor.css"
import Header from "@/components/layout/Header/Header";
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
          <Header />
          <div className="containerPage">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}