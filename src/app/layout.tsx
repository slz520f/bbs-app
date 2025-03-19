// app/layout.tsx
import type { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "掲示板アプリ",
  description: "Next.jsで作った掲示板",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
