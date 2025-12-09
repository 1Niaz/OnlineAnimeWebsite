"use client"

import { StoreProvider } from "@/lib/store-context"
import type React from "react"

export function ClientStoreProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}
