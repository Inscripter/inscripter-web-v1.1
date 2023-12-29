import localFont from "next/font/local"
import { Web3Modal } from "../context/Web3Modal";

import { siteConfig } from "@/config/site"
import { absoluteUrl, cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

const protoMonoRegular = localFont({
  src: [
    {
      path: '../assets/fonts/ProtoMono-Regular.woff2',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-proto-mono-regular',
});
const protoMonoMedium = localFont({
  src: [
    {
      path: '../assets/fonts/ProtoMono-Medium.woff2',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-proto-mono-medium',
});
const protoMonoSemibold = localFont({
  src: [
    {
      path: '../assets/fonts/ProtoMono-SemiBold.woff2',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-proto-mono-semibold',
});
const protoMonoLight = localFont({
  src: [
    {
      path: '../assets/fonts/ProtoMono-Light.woff2',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-proto-mono-light',
});

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Inscription",
    "Etherscan",
    "Kroma Network",
    "Klaytn",
    "Wemix",
  ],
  authors: [
    {
      name: "inscripter - Inscription Explorer",
      url: "https://inscripter.io",
    },
  ],
  creator: "inscripter",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@inscripter",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${protoMonoLight.variable} ${protoMonoRegular.variable} ${protoMonoSemibold.variable} ${protoMonoMedium.variable}`}>
      <head />
      <body className="min-h-screen bg-background font-protoMono-semibold antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div>
            <Web3Modal>
              {children}
              <Analytics />
              <Toaster />
              <TailwindIndicator />
            </Web3Modal>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
