import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/gallery/site-header";

export const metadata: Metadata = {
  title: { default: "YoDev Components", template: "%s · YoDev Components" },
  description:
    "252 composants React TypeScript inspirés des cinq collections épinglées de Frontend Joe.",
  metadataBase: new URL("https://yodev-components.vercel.app"),
  openGraph: {
    title: "YoDev Components",
    description: "Une galerie React de 252 composants classés par famille.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <p>YoDev Components · Ports React TypeScript autorisés.</p>
          <a
            href="https://github.com/frontend-joe"
            target="_blank"
            rel="noreferrer"
          >
            Créations originales de Frontend Joe ↗
          </a>
        </footer>
      </body>
    </html>
  );
}
