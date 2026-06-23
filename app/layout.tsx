import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://events.purrpleorryx.com"),

  title: "Event Management Company in Dubai | Purrple Orryx",

  description:
    "Purrple Orryx creates corporate events, gala dinners, conferences, family days and brand experiences across Dubai, the UAE and GCC.",

  keywords: [
    "event management company in Dubai",
    "corporate event management Dubai",
    "event company Dubai",
    "corporate events Dubai",
    "event agency Dubai",
    "gala dinner event management",
    "conference management Dubai",
    "family day event management",
    "team building events Dubai",
    "brand activation Dubai",
    "event production Dubai",
    "Purrple Orryx",
  ],

  alternates: {
    canonical: "https://events.purrpleorryx.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Corporate Event Management in Dubai | Purrple Orryx",
    description:
      "From conferences and gala dinners to family days and brand experiences, we create corporate events built to be remembered.",
    url: "https://events.purrpleorryx.com",
    siteName: "Purrple Orryx",
    locale: "en_AE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
  <html
    lang="en"
    className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col font-sans bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Google Tag Manager noscript */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MM74MX"
          height="0"
          width="0"
          style={{
            display: "none",
            visibility: "hidden",
          }}
        />
      </noscript>

      {children}

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({
              'gtm.start': new Date().getTime(),
              event:'gtm.js'
            });
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MM74MX');
        `}
      </Script>
    </body>
  </html>
);
  }
