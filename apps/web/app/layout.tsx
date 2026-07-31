import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUFLOW | Municipal Flow Platform",
  description:
    "Belediyeler, vatandaşlar, işletmeler ve ziyaretçileri tek bulut platformunda buluşturan City Operations Platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
