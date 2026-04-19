/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext'
import { apiRequest } from '../utils/api'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { userInfo, isLoggedIn } = useAuth()
  const [wishlistItems, setWishlistItems] = useState([])
  const [wishlistLoading, setWishlistLoading] = useState(false)
  const [wishlistError, setWishlistError] = useState('')

  useEffect(() => {
    if (!isLoggedIn || !userInfo?.token) {
      setWishlistItems([])
      setWishlistError('')
      return
    }

    let isMounted = true
    const fetchWishlist = async () => {
      setWishlistLoading(true)
      setWishlistError('')
      try {
        const data = await apiRequest('/api/users/wishlist', {
          token: userInfo.token,
        })

        if (!isMounted) return

        const normalized = data.map((book, index) => ({
          id: book._id,
          title: book.title || 'Untitled',
          author: book.author || 'Unknown Author',
          category: book.category || 'General',
          price: Number(book.price) || 0,
          image:
            book.image ||
            `https://picsum.photos/seed/${encodeURIComponent(book._id || `wishlist-${index}`)}/420/600`,
          stock: Number.isFinite(Number(book.stock)) ? `${book.stock} left` : book.stock || 'In Stock',
        }))

        setWishlistItems(normalized)
      } catch (error) {
        if (!isMounted) return
        setWishlistError(error.message)
      } finally {
        if (isMounted) {
          setWishlistLoading(false)
        }
      }
    }

    fetchWishlist()

    return () => {
      isMounted = false
    }
  }, [isLoggedIn, userInfo?.token])

  const requireLogin = () => {
    if (isLoggedIn && userInfo?.token) return true
    const message = 'Please login to use wishlist.'
    setWishlistError(message)
    window.alert(message)
    return false
  }

  const addToWishlist = async (book) => {
    if (!requireLogin()) return

    try {
      setWishlistError('')
      await apiRequest(`/api/users/wishlist/${book.id}`, {
        method: 'POST',
        token: userInfo.token,
      })

      setWishlistItems((prevItems) => {
        const alreadyExists = prevItems.some((item) => item.id === book.id)
        if (alreadyExists) return prevItems
        return [...prevItems, book]
      })
    } catch (error) {
      setWishlistError(error.message)
    }
  }

  const removeFromWishlist = async (bookId) => {
    if (!requireLogin()) return

    try {
      setWishlistError('')
      await apiRequest(`/api/users/wishlist/${bookId}`, {
        method: 'DELETE',
        token: userInfo.token,
      })

      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== bookId))
    } catch (error) {
      setWishlistError(error.message)
    }
  }

  const isInWishlist = (bookId) =>
    wishlistItems.some((item) => item.id === bookId)

  const toggleWishlist = async (book) => {
    if (isInWishlist(book.id)) {
      await removeFromWishlist(book.id)
      return
    }
    await addToWishlist(book)
  }

  const moveToCartFromWishlist = async (book, addToCart) => {
    addToCart(book)
    await removeFromWishlist(book.id)
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
    wishlistLoading,
    wishlistError,
    clearWishlistError: () => setWishlistError(''),
  }

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
