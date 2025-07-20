import "./globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Header } from "~/components/header/header"
import { siteURL } from "~/lib/constants"

import { AppHooks } from "./app-hooks"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ogl-starter | theteleporter.site",
    template: "%s | theteleporter.site"
  },
  metadataBase: siteURL,
  description: `A minimalist's boilerplate — OGL with TypeScript.`,
  twitter: {
    card: "summary_large_image",
    title: "ogl-starter | theteleporter.site",
    creator: "@theteleporter_",
    siteId: "@theteleporter_"
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppHooks />
        <Header />
        {children}
      </body>
    </html>
  )
}
