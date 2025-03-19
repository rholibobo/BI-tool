"use client"

import type React from "react"

import PublicRoute from "../../../components/auth/public-route"

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <PublicRoute>{children}</PublicRoute>
}

