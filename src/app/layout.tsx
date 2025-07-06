import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "핑크버블 🌸",
  description: "귀여운 AI 친구 핑크버블과 대화해보세요!",
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
