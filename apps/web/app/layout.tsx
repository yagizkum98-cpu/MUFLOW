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
      <body>
        <header className="site-header">
          <a className="brand" href="/">
            <img src="/muflow-logo.svg" alt="MUFLOW" />
          </a>
          <nav className="main-nav" aria-label="Ana menü">
            <a href="/platform">Platform</a>
            <a href="/moduller">Modüller</a>
            <a href="/cozumler">Çözümler</a>
            <a href="/hakkimizda">Hakkımızda</a>
            <a href="/iletisim">İletişim</a>
          </nav>
          <div className="header-actions">
            <a className="link-button" href="/demo-talep">Demo Talep Et</a>
            <a className="login-button" href="/giris">Giriş Yap</a>
          </div>
        </header>
        {children}
        <footer className="footer">
          <img src="/muflow-logo.svg" alt="MUFLOW" />
          <nav>
            <a href="/platform">Platform</a>
            <a href="/moduller">Modüller</a>
            <a href="/cozumler">Çözümler</a>
            <a href="/kvkk">KVKK</a>
            <a href="/gizlilik">Gizlilik</a>
            <a href="/iletisim">İletişim</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
