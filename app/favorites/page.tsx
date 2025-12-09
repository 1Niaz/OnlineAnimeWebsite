"use client"

import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store-context"
import { Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Favorites() {
  const { favorites } = useStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Вернуться в каталог
        </Link>

        <h1 className="text-4xl font-black mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Избранное
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg mb-8">У вас пока нет избранных товаров</p>
            <Link
              href="/catalog"
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-semibold"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
