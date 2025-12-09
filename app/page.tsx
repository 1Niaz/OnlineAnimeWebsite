"use client"

import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
            <span className="text-accent text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Добро пожаловать в мир аниме
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-balance">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              Лучшие аниме товары
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте для себя огромный выбор фигурок, манги, мерча и многого другого от ваших любимых аниме
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-all glow-pink"
          >
            Перейти в каталог
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Featured Categories */}
        <div className="grid md:grid-cols-3 gap-4 mt-20">
          {[
            { name: "Фигурки", emoji: "🎎", color: "from-purple-500" },
            { name: "Манга", emoji: "📚", color: "from-pink-500" },
            { name: "Мерч", emoji: "👕", color: "from-cyan-500" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href="/catalog"
              className={`group card-gradient p-8 rounded-lg hover:glow-purple transition-all cursor-pointer`}
            >
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-2">{cat.name}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-accent transition-colors">
                Просмотреть всё →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-accent mb-2">5000+</div>
              <div className="text-muted-foreground">Товаров в каталоге</div>
            </div>
            <div>
              <div className="text-4xl font-black text-accent mb-2">100%</div>
              <div className="text-muted-foreground">Оригинальные товары</div>
            </div>
            <div>
              <div className="text-4xl font-black text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Служба поддержки</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 ANIME STORE. Все права защищены. 🎌</p>
        </div>
      </footer>
    </div>
  )
}
