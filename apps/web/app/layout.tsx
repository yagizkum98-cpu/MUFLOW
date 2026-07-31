import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUFLOW | Municipal Flow Platform",
  description: "Belediyeler, vatandaşlar ve işletmeleri tek bulut platformunda buluşturan City Operations Platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <header className="site-header">
          <a className="brand" href="/">
            <img src="/muflow-logo.svg" alt="MUFLOW" />
          </a>
          <nav className="main-nav" aria-label="Ana menü">
            <a href="/platform">Platform</a>
            <a href="/giris">Giriş Yap</a>
          </nav>
        </header>
        {children}
        <footer className="footer">
          <img src="/muflow-logo.svg" alt="MUFLOW" />
          <nav>
            <a href="/platform">Platform</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
