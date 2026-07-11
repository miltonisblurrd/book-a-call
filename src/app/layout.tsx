import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, JetBrains_Mono, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.blurrdstudio.com"),
  title: {
    default: "BLURRD Studio | Website Design & Development",
    template: "%s | BLURRD Studio",
  },
  description:
    "We translate research into creative solutions crafting from start to finish thoughtful brands, apps, websites, and interfaces that bring results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} ${nunito.variable} w-mod-js w-mod-touch`}
    >
      <head>
        <link rel="icon" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/webclip.png" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-150386202-1"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-150386202-1');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
