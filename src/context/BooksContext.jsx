/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest } from '../utils/api'

const BooksContext = createContext()

const normalizeBook = (book, index) => {
  const price = Number(book.price) || 0
  const stockNumber = Number(book.stock)

  return {
    id: book._id,
    title: book.title || 'Untitled',
    author: book.author || 'Unknown Author',
    category: book.category || 'General',
    price,
    originalPrice: price,
    rating: 4 + (index % 10) / 10,
    reviews: 80 + index * 7,
    image:
      book.image ||
      `https://picsum.photos/seed/${encodeURIComponent(book._id || `book-${index}`)}/420/600`,
    shortDescription: book.summary || book.description || 'No summary available.',
    fullDescription: book.description || book.summary || 'No description available.',
    pages: 200 + index * 10,
    language: 'English',
    publisher: 'Ebook Shop',
    publishedYear: new Date(book.createdAt || Date.now()).getFullYear(),
    format: 'PDF',
    bestseller: index < 4,
    featured: index < 8,
    trending: index < 8,
    stock: Number.isFinite(stockNumber) ? `${stockNumber} left` : book.stock || 'In Stock',
    tags: ['Digital', 'Instant Access'],
    pdfUrl: book.pdfUrl || '',
    preview: book.preview || '',
  }
}

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const [booksLoading, setBooksLoading] = useState(true)
  const [booksError, setBooksError] = useState('')

  const refreshBooks = useCallback(async () => {
    setBooksLoading(true)
    setBooksError('')
    try {
      const apiBooks = await apiRequest('/api/books')
      setBooks(apiBooks.map(normalizeBook))
    } catch (error) {
      setBooksError(error.message)
      setBooks([])
    } finally {
      setBooksLoading(false)
    }
  }, [])

  const deleteBook = useCallback(async (id) => {
    try {
      await apiRequest(`/api/books/${id}`, {
        method: 'DELETE',
      })
      setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id))
    } catch (error) {
      console.error('Failed to delete book:', error.message)
      throw error
    }
  }, [])

  useEffect(() => {
    refreshBooks()
  }, [refreshBooks])

  const value = useMemo(
    () => ({
      books,
      booksLoading,
      booksError,
      refreshBooks,
      deleteBook,
    }),
    [books, booksLoading, booksError, refreshBooks, deleteBook],
  )

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
}

export const useBooks = () => useContext(BooksContext)
