import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageBanner from '../../components/PageBanner/PageBanner'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar'
import SortBar from '../../components/SortBar/SortBar'
import BookCard from '../../components/BookCard/BookCard'
import EmptyState from '../../components/EmptyState/EmptyState'
import books from '../../data/books'
import './Shop.css'

const maxBookPrice = Math.ceil(Math.max(...books.map((book) => book.price)))

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || 'All',
  )
  const [maxPrice, setMaxPrice] = useState(maxBookPrice)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popularity')

  const updateQueryParams = (nextSearch, nextCategory) => {
    const nextParams = new URLSearchParams(searchParams)

    if (nextSearch.trim()) nextParams.set('search', nextSearch.trim())
    else nextParams.delete('search')

    if (nextCategory !== 'All') nextParams.set('category', nextCategory)
    else nextParams.delete('category')

    setSearchParams(nextParams)
  }

  const handleSearchSubmit = () => {
    updateQueryParams(searchTerm, selectedCategory)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    updateQueryParams(searchTerm, category)
  }

  const filteredBooks = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()

    const result = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory
      const matchesPrice = book.price <= maxPrice
      const matchesRating = book.rating >= minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    })

    const sorted = [...result]

    if (sortBy === 'popularity') sorted.sort((a, b) => b.reviews - a.reviews)
    if (sortBy === 'newest') sorted.sort((a, b) => b.publishedYear - a.publishedYear)
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price)

    return sorted
  }, [searchTerm, selectedCategory, maxPrice, minRating, sortBy])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setMaxPrice(maxBookPrice)
    setMinRating(0)
    setSortBy('popularity')
    setSearchParams({})
  }

  return (
    <>
      <PageBanner
        title="All Ebooks"
        subtitle="Search, filter, and compare books just like a real ecommerce listing page."
      />

      <section className="section-space shop-section">
        <div className="page-container-wide shop-layout">
          <FilterSidebar
            selectedCategory={selectedCategory}
            maxPrice={maxPrice}
            maxPriceLimit={maxBookPrice}
            minRating={minRating}
            onCategoryChange={handleCategoryChange}
            onPriceChange={setMaxPrice}
            onRatingChange={setMinRating}
            onReset={resetFilters}
          />

          <div className="shop-main">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearchSubmit}
              placeholder="Search by title, author, or category"
            />

            <SortBar
              count={filteredBooks.length}
              total={books.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
            />

            {filteredBooks.length ? (
              <div className="books-grid shop-products-grid">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No books matched your filters"
                description="Try different keywords or reset filters to see more ebooks."
                actionText="Reset and Browse"
                actionLink="/shop"
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
