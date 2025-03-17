import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "../context/auth-context"
import ThemeRegistry from "../components/theme-registry"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Authentication",
  description: "Authentication system with Next.js",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthProvider>{children}</AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}





