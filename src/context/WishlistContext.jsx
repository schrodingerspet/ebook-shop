/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const WishlistContext = createContext()
const WISHLIST_STORAGE_KEY = 'ebook-shop-wishlist'

const readWishlistFromStorage = () => {
  const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
  if (!saved) return []

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(readWishlistFromStorage)

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (book) => {
    setWishlistItems((prevItems) => {
      const alreadyExists = prevItems.some((item) => item.id === book.id)
      if (alreadyExists) return prevItems
      return [...prevItems, book]
    })
  }

  const removeFromWishlist = (bookId) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== bookId))
  }

  const isInWishlist = (bookId) =>
    wishlistItems.some((item) => item.id === bookId)

  const toggleWishlist = (book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id)
      return
    }
    addToWishlist(book)
  }

  const moveToCartFromWishlist = (book, addToCart) => {
    addToCart(book)
    removeFromWishlist(book.id)
  }

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems])

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    isInWishlist,
    wishlistCount,
  }

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
