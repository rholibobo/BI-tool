"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMswReady, setIsMswReady] = useState(false)

  useEffect(() => {
    // Only import MSW in development
    if (process.env.NODE_ENV === "development") {
      import("../../mocks").then((module) => {
        const initMocks = module.default
        initMocks().then(() => {
          setIsMswReady(true)
        })
      })
    } else {
      setIsMswReady(true)
    }
  }, [])

  if (!isMswReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

