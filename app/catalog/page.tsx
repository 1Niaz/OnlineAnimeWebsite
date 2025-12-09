"use client"

import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/store-context"
import { useState, useMemo } from "react"
import { Search } from "lucide-react"

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Фигурка Levi Attack on Titan",
    price: 2499,
    image: "/anime-figure-levi.jpg",
    description: 'Премиум фигурка Лэви из "Атаки титанов"',
    category: "Фигурки",
  },
  {
    id: "2",
    name: "Naruto Manga Box Set",
    price: 8999,
    image: "/naruto-manga.jpg",
    description: "Полная коллекция манги Наруто",
    category: "Манга",
  },
  {
    id: "3",
    name: "Death Note Hoodie",
    price: 1999,
    image: "/death-note-hoodie.jpg",
    description: "Комфортная толстовка с логотипом Death Note",
    category: "Мерч",
  },
  {
    id: "4",
    name: "Mikasa Figure",
    price: 1899,
    image: "/anime-figure-mikasa.jpg",
    description: "Статуэтка Микасы высокого качества",
    category: "Фигурки",
  },
  {
    id: "5",
    name: "Demon Slayer Complete Series",
    price: 7499,
    image: "/demon-slayer-manga.png",
    description: 'Полная коллекция "Клинка, рассекающего демонов"',
    category: "Манга",
  },
  {
    id: "6",
    name: "One Piece Cap",
    price: 799,
    image: "/one-piece-cap.jpg",
    description: "Бейсболка с логотипом One Piece",
    category: "Мерч",
  },
  {
    id: "7",
    name: "Tokyo Ghoul Figure Set",
    price: 3499,
    image: "/tokyo-ghoul-figure.jpg",
    description: 'Набор фигурок из "Токийского гуля"',
    category: "Фигурки",
  },
  {
    id: "8",
    name: "My Hero Academia Poster Set",
    price: 499,
    image: "/my-hero-academia-poster.jpg",
    description: 'Набор постеров из "Моя геройская академия"',
    category: "Мерч",
  },
  {
    id: "9",
    name: "Code Geass Figure",
    price: 2199,
    image: "/code-geass-anime-figure.jpg",
    description: "Премиум фигурка Лелуша Ви Британии",
    category: "Фигурки",
  },
  {
    id: "10",
    name: "Sword Art Online Manga",
    price: 3999,
    image: "/sword-art-online.jpg",
    description: "Коллекция манги SAO",
    category: "Манга",
  },
  {
    id: "11",
    name: "Steins;Gate Mug",
    price: 599,
    image: "/steins-gate-mug.jpg",
    description: 'Кружка "Steins;Gate" для любимого напитка',
    category: "Мерч",
  },
  {
    id: "12",
    name: "Bleach Limited Edition Figure",
    price: 4999,
    image: "/bleach-anime-figure.jpg",
    description: "Ограниченное издание фигурки из Bleach",
    category: "Фигурки",
  },
]

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const categories = ["Фигурки", "Манга", "Мерч"]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Каталог товаров
          </h1>

          {/* Search */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === null
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-foreground border border-border hover:border-accent"
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-foreground border border-border hover:border-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  )
}
