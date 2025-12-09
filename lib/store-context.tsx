"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
  status: string
}

interface StoreContextType {
  cart: CartItem[]
  favorites: Product[]
  orders: Order[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  placeOrder: (customerInfo: any) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [favorites, setFavorites] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("anime-cart")
    const savedFavorites = localStorage.getItem("anime-favorites")
    const savedOrders = localStorage.getItem("anime-orders")

    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("anime-cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("anime-favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("anime-orders", JSON.stringify(orders))
  }, [orders])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleFavorite = (product: Product) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === product.id)
      if (exists) {
        return prev.filter((fav) => fav.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.id === productId)
  }

  const placeOrder = (customerInfo: any) => {
    if (cart.length === 0) return

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total,
      date: new Date().toLocaleDateString("ru-RU"),
      status: "Обработка",
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        orders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
