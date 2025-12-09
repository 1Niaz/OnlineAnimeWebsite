"use client"

import { Navbar } from "@/components/navbar"
import { useStore } from "@/lib/store-context"
import { ArrowLeft, Package, User } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Profile() {
  const { orders, favorites } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <h1 className="text-4xl font-black mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Профиль
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Info */}
          <div className="lg:col-span-1">
            <div className="card-gradient rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-center w-20 h-20 bg-accent/20 rounded-full mx-auto">
                <User className="w-10 h-10 text-accent" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Покупатель</h2>
                <p className="text-muted-foreground text-sm">ANIME STORE</p>
              </div>
              <div className="border-t border-border pt-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Член с</p>
                  <p className="text-foreground font-semibold">2025 г.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Избранные товары</p>
                  <p className="text-2xl font-bold text-accent">{mounted ? favorites.length : 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="card-gradient rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-accent" />
                История заказов
              </h2>

              {mounted && orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">У вас пока нет заказов</p>
                  <Link href="/catalog" className="inline-block mt-4 text-accent hover:text-accent/80">
                    Начните покупки →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {mounted &&
                    orders.map((order) => (
                      <div key={order.id} className="bg-input border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Заказ #{order.id}</p>
                            <p className="text-foreground font-semibold">{order.date}</p>
                          </div>
                          <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full font-semibold">
                            {order.status}
                          </span>
                        </div>
                        <div className="border-t border-border pt-3">
                          <p className="text-sm text-muted-foreground mb-2">
                            {order.items.length} товар{order.items.length !== 1 ? "ов" : ""}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              {order.items.slice(0, 2).map((item) => (
                                <p key={item.id} className="text-sm text-foreground">
                                  • {item.name} × {item.quantity}
                                </p>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-sm text-muted-foreground">+ еще {order.items.length - 2}</p>
                              )}
                            </div>
                            <div className="text-lg font-bold text-accent">₽{order.total.toLocaleString("ru-RU")}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
