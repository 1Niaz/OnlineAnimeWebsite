"use client"

import { Navbar } from "@/components/navbar"
import { useStore } from "@/lib/store-context"
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, placeOrder, clearCart } = useStore()
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    if (customerName && customerEmail) {
      placeOrder({ name: customerName, email: customerEmail })
      setOrderPlaced(true)
      setTimeout(() => {
        setOrderPlaced(false)
        setShowCheckout(false)
        setCustomerName("")
        setCustomerEmail("")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/catalog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Продолжить покупки
        </Link>

        <h1 className="text-4xl font-black mb-12 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Корзина
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg mb-8">Ваша корзина пуста</p>
            <Link
              href="/catalog"
              className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-lg font-semibold"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="card-gradient rounded-lg p-4 flex gap-4 items-start">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-semibold">₽{item.price.toLocaleString("ru-RU")}</span>
                        <span className="text-muted-foreground">×</span>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateCartQuantity(item.id, Number.parseInt(e.target.value))}
                          className="w-12 bg-input border border-border rounded px-2 py-1 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground mb-2">
                        ₽{(item.price * item.quantity).toLocaleString("ru-RU")}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout */}
            <div className="lg:col-span-1">
              <div className="card-gradient rounded-lg p-6 sticky top-24 space-y-4">
                <h2 className="text-xl font-bold text-foreground">Итого заказа</h2>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Товары ({cart.length})</span>
                    <span>₽{total.toLocaleString("ru-RU")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>Доставка</span>
                    <span>Бесплатно</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold text-accent">
                    <span>Итого</span>
                    <span>₽{total.toLocaleString("ru-RU")}</span>
                  </div>
                </div>

                {!showCheckout ? (
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded-lg font-semibold transition-colors glow-pink"
                  >
                    Оформить заказ
                  </button>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-input border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-input border border-border rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {orderPlaced && (
                      <div className="bg-accent/20 border border-accent text-accent px-4 py-3 rounded-lg text-sm font-semibold">
                        ✓ Заказ успешно оформлен!
                      </div>
                    )}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={orderPlaced || !customerName || !customerEmail}
                      className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-accent-foreground py-3 rounded-lg font-semibold transition-colors"
                    >
                      {orderPlaced ? "Спасибо за заказ!" : "Подтвердить заказ"}
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full bg-card border border-border hover:border-accent text-foreground py-2 rounded-lg font-semibold transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
