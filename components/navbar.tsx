"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Heart } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { useEffect, useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { cart } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          ✦ ANIME
        </Link>

        <div className="flex gap-8">
          <Link
            href="/"
            className={`transition-colors ${pathname === "/" ? "text-accent" : "text-foreground hover:text-accent"}`}
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            className={`transition-colors ${
              pathname === "/catalog" ? "text-accent" : "text-foreground hover:text-accent"
            }`}
          >
            Каталог
          </Link>
          <Link
            href="/profile"
            className={`transition-colors ${
              pathname === "/profile" ? "text-accent" : "text-foreground hover:text-accent"
            }`}
          >
            Профиль
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="/favorites" className="relative text-foreground hover:text-accent transition-colors">
            <Heart className="w-6 h-6" />
          </Link>
          <Link href="/cart" className="relative text-foreground hover:text-accent transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {mounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
