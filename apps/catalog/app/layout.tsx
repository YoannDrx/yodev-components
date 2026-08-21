import type { Metadata } from "next";
import "@yodev/components/styles.css";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: { default: "YoDev Components", template: "%s · YoDev Components" },
  description:
    "Catalogue visuel de composants frontend et librairie React originale YoDev.",
  metadataBase: new URL("https://yodev-components.vercel.app"),
  openGraph: {
    title: "YoDev Components",
    description: "Explore, compare et adapte des composants frontend.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('yodev-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}",
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
