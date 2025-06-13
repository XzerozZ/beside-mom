import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import { GlobalStateProvider } from "./context/GlobalState";
import "./globals.css";
const notoSansThai = Noto_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "Beside Mom",
  description: "ระบบดูแลสุขภาพแม่และเด็ก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="light">
      <head>
        <link rel="icon" href="/besidemom.ico" type="image/x-icon" />
      </head>
      <body
        className={`${notoSansThai.variable} font-sans antialiased bg-white`}
      >
        <GlobalStateProvider>
          {children}
        </GlobalStateProvider>
      </body>
    </html>
  );
}
