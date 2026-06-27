import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AppChrome from "@/components/AppChrome";
import Script from "next/script";

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Yuricart",
//     absolute: "Yuricart",
//   },
//   description:
//     "Shop smart, save big – Discover electronics without breaking the bank.",
//   icons: {
//     icon: "/logonew.svg",
//   },
// };

export const metadata: Metadata = {
  title: {
    template: "%s | Yuricart",
    absolute: "Yuricart",
  },
  description:
    "Shop smart, save big – Discover electronics without breaking the bank.",
  icons: {
    icon: "/logonew.svg", // Path to your favicon
  },
  metadataBase: new URL("https://www.yuricart.com/"),
  openGraph: {
    title: "Yuricart",
    description:
      "Shop smart, save big – Discover electronics without breaking the bank.",
    url: "https://www.yuricart.com/", //
    siteName: "Yuricart",
    images: [
      {
        url: "/newlogoog.jpg",
        width: 1200,
        height: 630,
        alt: "Yuricart Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuricart",
    description:
      "Shop smart, save big – Discover electronics without breaking the bank.",
    images: ["/newlogoog.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CCEKQ4Y5C6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CCEKQ4Y5C6');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AppChrome
              navbar={<Navbar />}
              footer={<Footer />}
              whatsapp={<WhatsAppButton />}
            >
              {children}
            </AppChrome>
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
