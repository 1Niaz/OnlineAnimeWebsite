"use client"

import type { Product } from "@/lib/store-context"
import { useStore } from "@/lib/store-context"
import { Heart, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useStore()
  const favorite = isFavorite(product.id)

  return (
    <div className="card-gradient rounded-lg overflow-hidden hover:glow-purple transition-all duration-300 group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={() => toggleFavorite(product)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            favorite ? "bg-accent text-accent-foreground" : "bg-black/50 text-white hover:bg-black/70"
          }`}
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{product.category}</div>
        <h3 className="font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-lg font-bold text-accent">₽{product.price.toLocaleString("ru-RU")}</div>
          <button
            onClick={() => addToCart(product)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
