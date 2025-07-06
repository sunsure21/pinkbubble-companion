import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "핑크버블 🌸",
  description: "핑크버블과 지구환경을 지키는 모험을 떠나요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} m-0 p-0`}>
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
