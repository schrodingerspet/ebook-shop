/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext()
const CART_STORAGE_KEY = 'ebook-shop-cart'

const readCartFromStorage = () => {
  const saved = localStorage.getItem(CART_STORAGE_KEY)
  if (!saved) return []

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(readCartFromStorage)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (book, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === book.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prevItems, { ...book, quantity }]
    })
  }

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId))
  }

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const increaseQuantity = (bookId) => {
    const item = cartItems.find((cartItem) => cartItem.id === bookId)
    if (!item) return
    updateQuantity(bookId, item.quantity + 1)
  }

  const decreaseQuantity = (bookId) => {
    const item = cartItems.find((cartItem) => cartItem.id === bookId)
    if (!item) return
    updateQuantity(bookId, item.quantity - 1)
  }

  const clearCart = () => setCartItems([])

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  )

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartCount,
    subtotal,
    totalPrice: subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
